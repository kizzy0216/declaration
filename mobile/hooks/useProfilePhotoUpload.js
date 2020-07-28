import React, { useState, useContext } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { useMutation } from 'urql';

import UpdateUserProfilePhoto from '~/mutations/UpdateUserProfilePhoto';
import { UserContext } from '~/contexts/UserContext';
import { fetchREST } from '~/utils/api';
import { IS_IOS } from '~/constants';

function useProfilePhotoUpload({
  onComplete = () => {},
}) {
  const [
    updatePhotoResult,
    updatePhoto,
  ] = useMutation(UpdateUserProfilePhoto);
  const [isFetching, setIsFetching] = useState(false);
  const { user } = useContext(UserContext);

  async function handlePhotoUpload({ uri }) {
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

    await updatePhoto({
      uuid: user.profile.uuid,
      photo: uploadedPhotoUrl,
    });

    onComplete();
  }

  async function handleInitiation() {
    if (IS_IOS) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to upload your own profile photo.');
        return;
      }
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
        base64: true,
      });

      if (!result.cancelled) {
        handlePhotoUpload(result);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return {
    isFetching,
    handleInitiation,
  };
}

export default useProfilePhotoUpload;
