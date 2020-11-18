import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import { fetchREST } from '~/utils/api';
import { IS_IOS } from '~/constants';

function useMediaUpload() {
  const [isFetching, setIsFetching] = useState(false);

  async function handleUpload({ asset }) {
    if (!asset) { return }
    const type = (

      ((asset.type && asset.type === 'image') || (asset.mediaType && asset.mediaType === 'photo')
        ? 'image/' : 'video/' ) +
      (asset.filename || asset.uri).split('.').pop().toLowerCase()
    );

    setIsFetching(true);

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
      uri: (IS_IOS ? asset.uri.replace('file://', '') : asset.uri),
    });

    await fetch(policy.url, {
      method: 'POST',
      body: formData,
    });

    setIsFetching(false);

    return {
      url: uploadedPhotoUrl,
      type,
    };
  }

  return {
    isFetching,
    handleUpload,
  };
}

export default useMediaUpload;
