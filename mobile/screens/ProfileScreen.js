import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ProfileHeader from '~/components/ProfileHeader';

function ProfileScreen({ navigation }) {
  return (
    <SafeAreaView>
      <ProfileHeader
        onSettingsPress={() => navigation.navigate('Settings')}
      />
      <Text>Profile</Text>
    </SafeAreaView>
  );
}

export default ProfileScreen;
