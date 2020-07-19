import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';

import ScreenHeader from '~/components/ScreenHeader';
import { UserContext } from '~/contexts/UserContext';

function ProfileHeader({
  onSettingsPress = () => {},
}) {
  const { user } = useContext(UserContext);

  return (
    <ScreenHeader
      heading={user.email}
      rightElement={(
      <BorderlessButton
        onPress={onSettingsPress}
      >
        <Ionicons
          name="md-settings"
          size={22}
        />
      </BorderlessButton>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  usernameWrapper: {
    flex: 1,
  },
  username: {
    textAlign: 'center',
  },
  iconWrapper: {
    position: 'absolute',
    right: 20,
  },
});

export default ProfileHeader;
