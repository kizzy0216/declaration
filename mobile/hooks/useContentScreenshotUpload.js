import React from 'react';
// import * as Permissions from 'expo-permissions';
import { useMutation } from 'urql';

import UpdateContentScreenshot from '~/mutations/UpdateContentScreenshot';
import { fetchREST } from '~/utils/api';
import { IS_IOS } from '~/constants';

function useContentScreenshotUpload() {
  const [ updateScreenshotResult, updateScreenshot ] = useMutation(UpdateContentScreenshot);
  const [isFetching, setIsFetching] = React.useState(false);

  async function uploadScreenshot({ contentUuid, uri }) {
    setIsFetching(true);

    const type = 'image/jpeg';

    const policyResponse = await fetchREST('/signed-s3-post-policy', {
      method: 'POST',
      body: JSON.stringify({
        contentType: type,
      }),
    });
    const policy = await policyResponse.json();
    const uploadedPhotoUrl = `${policy.url}/${policy.fields.key}`;

    const formData = new FormData();
    formData.append('Content-Type', type);
    Object.entries(policy.fields).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append('file', {
      name: policy.fields.key,
      type,
      uri: (IS_IOS ? uri.replace('file://', '') : uri),
    });

    await fetch(policy.url, {
      method: 'POST',
      body: formData,
    });

    setIsFetching(false);

    await updateScreenshot({
      uuid: contentUuid,
      screenshot: uploadedPhotoUrl,
    });
  }

  async function handleScreenshotUpload(contentUuid, uri) {
    // if (IS_IOS) {
    //   const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    //   if (status !== 'granted') {
    //     return;
    //   }
    // }
    try {
      uploadScreenshot({contentUuid, uri});
    } catch (error) {
      console.error(error);
    }
  }

  return {
    isFetching,
    handleScreenshotUpload,
  };
}

export default useContentScreenshotUpload;
