import React from 'react';
import { useMutation } from 'urql';

import UpdateUserProfileDetails from '~/mutations/UpdateUserProfileDetails';
import ProfileEditModal from '~/components/ProfileEditModal';

function ProfileEditModalContainer({
  user,
  isVisible,
  onClose = () => {},
  onUpdate = () => {},
}) {
  const [
    updateProfileDetailsResult,
    updateProfileDetails,
  ] = useMutation(UpdateUserProfileDetails);

  function handleSubmit({
    name,
    username,
    personalBio,
    dateOfBirth,
    gender,
  }) {
    updateProfileDetails({
      user_uuid: user.uuid,
      user_profile_uuid: user.profile.uuid,
      user_profile_private_uuid: user.profile.private.uuid,
      name,
      username,
      personal_bio: personalBio,
      date_of_birth: dateOfBirth,
      gender,
    }).then(() => {
      onUpdate();
      onClose();
    });
  }

  return (
    <ProfileEditModal
      user={user}
      isVisible={isVisible}
      isFetching={updateProfileDetailsResult.fetching}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}

export default ProfileEditModalContainer;
