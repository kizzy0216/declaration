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
          <div className="row">
            <Card
              heading="Network name"
              note="30 characters max"
              isFetching={updateNameResult.fetching}
            >
              <p>
                This is the network's public name.
              </p>
              <p>
                For example, the name of your community or organization.
              </p>

              <NetworkNameForm
                initialValues={{
                  name: network.name,
                }}
                onNameChange={handleNameChange}
              />
            </Card>
          </div>

          <div className="row">
            <Card
              heading="Network avatar"
              note="Square, 256x256, negative space to account for rounded treatment"
              isFetching={isFetchingAvatar || updateAvatarResult.fetching}
            >
              <div className="network-avatar-container">
                <div>
                  <p>
                    This is the network's public avatar.
                  </p>
                  <p>
                    Click on the avatar and upload any image you like.
                  </p>
                </div>

                <NetworkAvatarForm
                  initialValues={{
                    avatar: network.avatar,
                  }}
                  onFileChange={handleAvatarFileChange}
                />
              </div>
            </Card>
          </div>
        </div>
      }

      <style jsx>{`
        .network-settings-page {
          padding-top: 20px;
          padding-right: 20px;
          padding-bottom: 20px;
          padding-left: 20px;
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
          max-width: 600px;
        }

        h2 {
          margin-bottom: 20px;
        }

        p {
          margin-bottom: 5px;

          &:last-of-type {
            margin-bottom: 20px;
          }
        }

        .row {
          margin-bottom: 40px;
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

export default NetworkSettingsPage;
