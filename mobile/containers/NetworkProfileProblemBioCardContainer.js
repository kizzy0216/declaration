import React, { useState } from 'react';
import { useMutation } from 'urql';

import UpdateNetworkUserProfileProblemBio from '~/mutations/UpdateNetworkUserProfileProblemBio';
import ProfileSectionCard from '~/components/ProfileSectionCard';
import Paragraph from '~/components/Paragraph';
import ProfileProblemBioEditModal from '~/components/ProfileProblemBioEditModal';

const EMPTY_STATE_PARAGRAPH = 'Add problem bio';

function NetworkProfileProblemBioCardContainer({
  user,
  network,
  isEditable = false,
  onUpdate = () => {},
}) {
  const [
    updateProblemBioResult,
    updateProblemBio,
  ] = useMutation(UpdateNetworkUserProfileProblemBio);
  const [isModalActive, setIsModalActive] = useState(false);

  if (!user || !network) {
    return null;
  }

  const networkProfile = user.profilesByNetworkUuid[network.uuid];
  const problemBio = networkProfile.problemBio;
  const hasProblemBio = (
    problemBio &&
    problemBio.length > 0
  );

  const inner = (
    hasProblemBio ? (
      <Paragraph size="small">
        {problemBio}
      </Paragraph>
    ) : isEditable ? (
      <Paragraph size="small">
        {EMPTY_STATE_PARAGRAPH}
      </Paragraph>
    ) : (
      null
    )
  );

  function handleSubmit({ problemBio }) {
    updateProblemBio({
      uuid: networkProfile.uuid,
      problem_bio: problemBio,
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
      <ProfileProblemBioEditModal
        networkProfile={networkProfile}
        network={network}
        isVisible={isModalActive}
        isFetching={updateProblemBioResult.fetching}
        onClose={() => setIsModalActive(false)}
        onSubmit={handleSubmit}
      />
      <ProfileSectionCard
        heading={('The one thing I\nneed help with is')}
        isEditable={isEditable}
        onPress={() => setIsModalActive(true)}
      >
        {inner}
      </ProfileSectionCard>
    </>
  );
}

export default NetworkProfileProblemBioCardContainer;
