import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQuery, useMutation } from 'urql';

import GetNetworkById from '~/queries/GetNetworkById';
import UpdateNetwork from '~/mutations/UpdateNetwork';
import mapNetwork from '~/shared/mappings/mapNetwork';
import debounce from '~/shared/utils/debounce';
import { fetchREST } from '~/utils/api';
import Avatar from '~/shared/components/Avatar';
import SpinnerIcon from '~/shared/components/icons/SpinnerIcon';

function NetworkSettingsPage() {
  const [isFetchingAvatar, setIsFetchingAvatar] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const router = useRouter();
  const { networkId } = router.query;
  const [result] = useQuery({
    query: GetNetworkById,
    variables: {
      id: networkId,
    },
  });
  const [name, setName] = useState(null)
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [
    updateNetworkResult,
    updateNetwork,
  ] = useMutation(UpdateNetwork);

  let network;
  if (result.data && result.data.network.length > 0) {
    network = mapNetwork(result.data.network[0]);
  }

  const handleUpdate = debounce(() => {
    updateNetwork({
      uuid: network.uuid,
      name,
      avatar: avatarUrl
    });
  }, 300);

  const handleNameChange = ({ name }) => {
    setName(name)
  };

  async function handleAvatarFileChange({ file }) {
    setIsFetchingAvatar(true);
    const policyResponse = await fetchREST('/signed-s3-post-policy', {
      method: 'POST',
      body: JSON.stringify({
        contentType: file.type,
      }),
    });
    const policy = await policyResponse.json();

    const formData = new FormData();
    formData.append('Content-Type', file.type);
    Object.entries(policy.fields).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append('file', file);

    await fetch(policy.url, {
      method: 'POST',
      body: formData,
    });

    const uploadedAvatarUrl = `${policy.url}/${policy.fields.key}`;
    setAvatarUrl(uploadedAvatarUrl)

    setIsFetchingAvatar(false);
  }

  useEffect(() => {
    if (result.data && result.data.network.length > 0) {
      setName(mapNetwork(result.data.network[0]).name);
      setAvatarUrl(mapNetwork(result.data.network[0]).avatar);
    }
  }, [result])

  useEffect(() => {
    setIsFetching(updateNetworkResult.fetching)
  })

  return (
    <div className="network-settings-page">
      {(!network || isFetching) &&
        <div className="spinner-wrapper">
          <SpinnerIcon
            width="24"
            height="24"
          />
        </div>
      }

      {(network || !isFetching) &&
        <div className="container">
          <div style={{width: '100%'}}>
            <div className="row">
              <Section
                title="Network name"
                description={`Enter the name of your community or organization.\n
                  This is the name which will appear on the app.
                `}
                style={{ maxWidth: 330, paddingBottom: 34 }}
              >
                <NetworkNameForm
                  initialValues={{
                    name: name,
                  }}
                  onNameChange={handleNameChange}
                />
              </Section>
            </div>

            <div className="row">
              <Section
                title="Network logo"
                description="Your logo will appear on every emails sent to your network."
                style={{ paddingBottom: 40 }}
              >
                <NetworkAvatarForm
                  initialValues={{
                    avatar: avatarUrl,
                  }}
                  isFetching={isFetchingAvatar}
                  onFileChange={handleAvatarFileChange}
                />
              </Section>
            </div>
          </div>

          <div className="save-btn-container">
            <button onClick={handleUpdate}>Save</button>
          </div>
        </div>
      }

      <style jsx>{`
        .network-settings-page {
          padding: 40px;
          width: 100%;
          height: 100%;
        }

        .spinner-wrapper {
          display: flex;
          flex-flow: column;
          justify-content: center;
          align-items: center;
        }

        .container {
          display: flex;
        }

        h2 {
          margin-bottom: 20px;
        }

        button {
          border-radius: 10px;
          background-color: #6ac2bd;
          font-family: var(--font-family-sans-serif);
          font-size: 14px;
          font-weight: 500;
          color: #fff;
          line-height: 20px;
          padding: 8.5px 12px;
          box-shadow: var(--box-shadow);

          &:hover {
            opacity: 0.7;
          }
        }

        p {
          margin-bottom: 5px;

          &:last-of-type {
            margin-bottom: 20px;
          }
        }

        .row {
          margin-bottom: 40px;
          border-bottom: 2px solid var(--light-gray);
        }

        .network-avatar-container {
          display: flex;
          flex-flow: row;
          justify-content: space-between;
          align-items: center;
        }

        .save-btn-container {
          margin-left: 40px;
        }
      `}</style>
    </div>
  );
}

function Section({
  title,
  description,
  style,
  children
}) {
  return (
    <div style={style && style}>
      <h2 className="settings-title">
        {title}
      </h2>
      <p className="settings-description">
        {description}
      </p>

      {children}

      <style jsx>{`
        .settings-title {
          font-family: var(--font-family-serif);
          font-size: 36px;
          color: var(--dark);
          font-weight: 400;
          margin-bottom: 5px;
        }

        .settings-description {
          font-family: var(--font-family-sans-serif);
          font-size: 14px;
          font-weight: 400;
          color: var(--dark);
          line-height: 20px;
          margin-bottom: 15px;
        }
      `}</style>
    </div>
  )
}

function NetworkNameForm({
  initialValues = {},
  onNameChange = () => {},
}) {

  const handleNameChange = event => {
    const updatedName = event.target.value;

    onNameChange({ name: updatedName });
  }

  return (
    <div className="network-name-form">
      <input
        type="text"
        value={initialValues.name || ''}
        placeholder="Your network name"
        maxLength={30}
        onChange={handleNameChange}
      />
      <small className="helper">30 characters max</small>

      <style jsx>{`
        .network-name-form {
          display: flex;
          flex-direction: column;
          & input {
            width: 177px;
            font-family: var(--font-family-sans-serif);
            font-weight: 400;
            font-size: 16px;
            line-height: 20px;
            color: var(--dark);

            padding: 7px 0;
            border-bottom: 1px solid var(--dark);
          }

          & .helper {
            margin-top: 4px;
            font-family: var(--font-family-sans-serif);
            font-weight: 400;
            font-size: 12px;
            line-height: 20px;
            color: var(--gray);
          }
        }
      `}</style>
    </div>
  )
}

function NetworkAvatarForm({
  initialValues = {},
  isFetching,
  onFileChange = () => {},
}) {
  const handleFileChange = event => {
    const file = event.target.files[0];
    onFileChange({ file });
  }

  return (
    <div className="network-avatar-form">
      <label htmlFor="avatar-file-input">
        <Avatar
          imageSrc={initialValues.avatar}
          size="large"
        />
        <input
          id="avatar-file-input"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </label>
      <div className="helper">Upload image (256x256)</div>

      {isFetching &&
        <SpinnerIcon />
      }

      <style jsx>{`
        .network-avatar-form {
          display: flex;
          align-items: center;
          margin-top: 24px;

          & label {
            cursor: pointer;
          }

          & input {
            display: none;
          }

          & .helper {
            margin-left: 20px;
            margin-right: 20px;
            font-family: var(--font-family-sans-serif);
            font-weight: 500;
            font-size: 14px;
            color: var(--dark);
          }
        }

      `}</style>
    </div>
  )
}

export default NetworkSettingsPage;
