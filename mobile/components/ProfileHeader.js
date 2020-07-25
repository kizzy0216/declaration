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
      heading={(
        user.profile.username
          ? `@${user.profile.username}`
          : user.email
      )}
      rightElement={(
        <BorderlessButton onPress={onSettingsPress}>
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
});

export default ProfileHeader;
