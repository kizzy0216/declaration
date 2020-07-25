import React, { useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ProfileHeader from '~/components/ProfileHeader';
import { UserContext } from '~/contexts/UserContext';
import ScreenCard from '~/components/ScreenCard';
import DisplayHeading from '~/components/DisplayHeading';
import PersonalBio from '~/components/PersonalBio';
import ProfileSummaryCard from '~/components/ProfileSummaryCard';
import EditIcon from 'Shared/components/icons/EditIcon';

function ProfileScreen({ navigation }) {
  const { user } = useContext(UserContext);

  function handleEdit() {
  }

  function handleEditLocation() {
  }

  function handleEditWork() {
  }

  function handleEditEducation() {
  }

  return (
    <ScreenCard
      uuid={user.uuid}
      headerImageSrc={user.profile.photo}
      header={(
        <ProfileHeader
          onSettingsPress={() => navigation.navigate('Settings')}
        />
      )}
      stamp="Create positive social impact."
      actions={[
        {
          icon: (
            <EditIcon
              fill="#000"
              width="50%"
              height="50%"
            />
          ),
          onPress: handleEdit,
        },
      ]}
    >
      <DisplayHeading>
        {user.name}
      </DisplayHeading>
      <PersonalBio
        username={user.profile.username}
        personalBio={user.profile.personalBio}
      />
      <ProfileSummaryCard
        profile={user.profile}
        isEditable={true}
        onEditLocation={handleEditLocation}
        onEditWork={handleEditWork}
        onEditEducation={handleEditEducation}
      />
    </ScreenCard>
  );
}

const styles = StyleSheet.create({
});

export default ProfileScreen;
