import React, { useState } from 'react';
import { useMutation } from 'urql';

import UpdateNetworkUserProfileSolutionBio from '~/mutations/UpdateNetworkUserProfileSolutionBio';
import ProfileSectionCard from '~/components/ProfileSectionCard';
import Paragraph from '~/components/Paragraph';
import ProfileSolutionBioEditModal from '~/components/ProfileSolutionBioEditModal';

const EMPTY_STATE_PARAGRAPH = 'Add solution bio';

function NetworkProfileSolutionBioCardContainer({
  user,
  network,
  isEditable = false,
  onUpdate = () => {},
}) {
  const [
    updateSolutionBioResult,
    updateSolutionBio,
  ] = useMutation(UpdateNetworkUserProfileSolutionBio);
  const [isModalActive, setIsModalActive] = useState(false);

  if (!user || !network) {
    return null;
  }

  const networkProfile = user.profilesByNetworkUuid[network.uuid];
  const solutionBio = networkProfile.solutionBio;
  const hasSolutionBio = (
    solutionBio &&
    solutionBio.length > 0
  );

  const inner = (
    hasSolutionBio ? (
      <Paragraph size="small">
        {solutionBio}
      </Paragraph>
    ) : isEditable ? (
      <Paragraph size="small">
        {EMPTY_STATE_PARAGRAPH}
      </Paragraph>
    ) : (
      null
    )
  );

  function handleSubmit({ solutionBio }) {
    updateSolutionBio({
      uuid: networkProfile.uuid,
      solution_bio: solutionBio,
    }).then(() => {
      onUpdate();
      setIsModalActive(false);
    });
  }

  if (!inner) {
    return null;
  }

  return (
    <>
      <ProfileSolutionBioEditModal
        networkProfile={networkProfile}
        isVisible={isModalActive}
        isFetching={updateSolutionBioResult.fetching}
        onClose={() => setIsModalActive(false)}
        onSubmit={handleSubmit}
      />
      <ProfileSectionCard
        heading={('The one thing I\ncan help you with is')}
        isEditable={isEditable}
        onPress={() => setIsModalActive(true)}
      >
        {inner}
      </ProfileSectionCard>
    </>
  );
}

export default NetworkProfileSolutionBioCardContainer;
