import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import ScreenHeader from '~/components/ScreenHeader';
import { UserContext } from '~/contexts/UserContext';
import SettingsIcon from 'Shared/components/icons/SettingsIcon';

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
        <SettingsIcon
          width={22}
          height={22}
          fill="black"
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
