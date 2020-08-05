import React, { useState } from 'react';
import { useMutation } from 'urql';

import UpdateUserProfileLocation from '~/mutations/UpdateUserProfileLocation';
import UpdateUserProfileWorkDetails from '~/mutations/UpdateUserProfileWorkDetails';
import UpdateUserProfileEducationalInstitution from '~/mutations/UpdateUserProfileEducationalInstitution';
import ProfileSummaryCard from '~/components/ProfileSummaryCard';
import ProfileLocationEditModal from '~/components/ProfileLocationEditModal';
import ProfileWorkEditModal from '~/components/ProfileWorkEditModal';
import ProfileEducationEditModal from '~/components/ProfileEducationEditModal';

function ProfileSummaryCardContainer({
  user,
  network,
  isEditable,
  onUpdate = () => {},
}) {
  const [
    updateLocationResult,
    updateLocation,
  ] = useMutation(UpdateUserProfileLocation);
  const [
    updateWorkDetailsResult,
    updateWorkDetails,
  ] = useMutation(UpdateUserProfileWorkDetails);
  const [
    updateEducationalInstitutionResult,
    updateEducationalInstitution,
  ] = useMutation(UpdateUserProfileEducationalInstitution);
  const [isEditLocationModalActive, setIsEditLocationModalActive] = useState(false);
  const [isEditWorkModalActive, setIsEditWorkModalActive] = useState(false);
  const [isEditEducationModalActive, setIsEditEducationModalActive] = useState(false);

  function handleLocationSubmit({ location, latitudeLongitude }) {
    updateLocation({
      uuid: user.profile.uuid,
      location,
      location_latitude_longitude: `(${latitudeLongitude.join(',')})`,
    }).then(() => {
      onUpdate();
      setIsEditLocationModalActive(false);
    });
  }

  function handleWorkSubmit({
    workTitle,
    workPlace,
  }) {
    updateWorkDetails({
      uuid: user.profile.uuid,
      work_title: workTitle,
      work_place: workPlace,
    }).then(() => {
      onUpdate();
      setIsEditWorkModalActive(false);
    });
  }

  function handleEducationSubmit({ educationalInstitution }) {
    updateEducationalInstitution({
      uuid: user.profile.uuid,
      educational_institution: educationalInstitution,
    }).then(() => {
      onUpdate();
      setIsEditEducationModalActive(false);
    });
  }

  return (
    <>
      <ProfileLocationEditModal
        user={user}
        isVisible={isEditLocationModalActive}
        isFetching={updateLocationResult.fetching}
        onClose={() => setIsEditLocationModalActive(false)}
        onSubmit={handleLocationSubmit}
      />
      <ProfileWorkEditModal
        user={user}
        isVisible={isEditWorkModalActive}
        isFetching={updateWorkDetailsResult.fetching}
        onClose={() => setIsEditWorkModalActive(false)}
        onSubmit={handleWorkSubmit}
      />
      <ProfileEducationEditModal
        user={user}
        isVisible={isEditEducationModalActive}
        isFetching={updateEducationalInstitutionResult.fetching}
        onClose={() => setIsEditEducationModalActive(false)}
        onSubmit={handleEducationSubmit}
      />
      <ProfileSummaryCard
        profile={user.profile}
        isEditable={isEditable}
        onEditLocation={() => setIsEditLocationModalActive(true)}
        onEditWork={() => setIsEditWorkModalActive(true)}
        onEditEducation={() => setIsEditEducationModalActive(true)}
      />
    </>
  );
}

export default ProfileSummaryCardContainer;
