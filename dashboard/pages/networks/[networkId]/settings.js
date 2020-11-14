import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery, useMutation } from 'urql';

import Card from '~/shared/components/Card';
import GetNetworkById from '~/queries/GetNetworkById';
import UpdateNetworkName from '~/mutations/UpdateNetworkName';
import UpdateNetworkAvatar from '~/mutations/UpdateNetworkAvatar';
import mapNetwork from '~/shared/mappings/mapNetwork';
import NetworkNameForm from '~/components/NetworkNameForm';
import NetworkAvatarForm from '~/components/NetworkAvatarForm';
import debounce from '~/shared/utils/debounce';
import { fetchREST } from '~/utils/api';
import SpinnerIcon from '~/shared/components/icons/SpinnerIcon';

function NetworkSettingsPage() {
  const [isFetchingAvatar, setIsFetchingAvatar] = useState(false);
  const router = useRouter();
  const { networkId } = router.query;
  const [result] = useQuery({
    query: GetNetworkById,
    variables: {
      id: networkId,
    },
  });
  const [
    updateNameResult,
    updateName,
  ] = useMutation(UpdateNetworkName);
  const [
    updateAvatarResult,
    updateAvatar,
  ] = useMutation(UpdateNetworkAvatar);

  let network;
  if (result.data && result.data.network.length > 0) {
    network = mapNetwork(result.data.network[0]);
  }

  const handleNameChange = debounce(({ name }) => {
    if (name.length === 0) {
      return;
    }

    updateName({
      uuid: network.uuid,
      name,
    });
  }, 300);

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

    updateAvatar({
      uuid: network.uuid,
      avatar: uploadedAvatarUrl,
    });

    setIsFetchingAvatar(false);
  }

  return (
    <div className="network-settings-page">
      {!network &&
        <div className="spinner-wrapper">
          <SpinnerIcon
            width="24"
            height="24"
          />
        </div>
      }

      {network &&
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
                <Input
                  value={`UNC Charlotte`}
                />
              </Section>
            </div>

            <div className="row">
              <Section
                title="Network logo"
                description="Your logo will appear on every emails sent to your network."
                style={{ paddingBottom: 40 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', marginTop: 24 }}>
                  <div style={{ width: 60, height: 60, borderRadius: '50%', border: '1px solid #222'}}></div>
                  <div style={{ marginLeft: 20, fontFamily: '"Roboto", sans-serif', fontWeight: 500, fontSize: 14}}>Upload Image (256x256)</div>
                </div>
              </Section>
            </div>

            {/* <div className="row">
              <Section
                title="Network category"
                description="Select network type."
              />
            </div> */}
          </div>

          <div style={{marginLeft: 40}}>
            <button>Save</button>
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

function Input({
  value
}) {
  return (
    <div className="input-container">
      <input
        type="text"
        value={value}
      />
      <small className="helper">30 characters max</small>

      <style jsx>{`
        .input-container {
          display: flex;
          flex-direction: column;
        }

        input {
          width: 177px;
          font-family: var(--font-family-sans-serif);
          font-weight: 400;
          font-size: 16px;
          line-height: 20px;
          color: var(--dark);

          padding: 7px 0;
          border-bottom: 1px solid var(--dark);
        }

        .helper {
          margin-top: 4px;
          font-family: var(--font-family-sans-serif);
          font-weight: 400;
          font-size: 12px;
          line-height: 20px;
          color: var(--gray);
        }
      `}</style>
    </div>
  )
}

export default NetworkSettingsPage;
