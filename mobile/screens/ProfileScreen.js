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

function ProfileScreen({ navigation }) {
  const { user } = useContext(UserContext);

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
    >
      <Text>{user.name}</Text>
      <Text>@{user.profile.username}</Text>
      <Text>{user.profile.personalBio}</Text>
      <Text>{user.profile.location}</Text>
      <Text>{user.profile.workTitle}</Text>
      <Text>{user.profile.workPlace}</Text>
      <Text>{user.profile.educationalInstitution}</Text>
    </ScreenCard>
  );
}

const styles = StyleSheet.create({
});

export default ProfileScreen;
