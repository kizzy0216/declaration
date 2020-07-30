import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import ScreenHeader from '~/components/ScreenHeader';
import SettingsIcon from 'Shared/components/icons/SettingsIcon';
import CloseIcon from 'Shared/components/icons/CloseIcon';
import { WINDOW_WIDTH } from '~/constants';

const PULL_UP_DISTANCE = WINDOW_WIDTH * 0.5;

function ProfileHeader({
  user,
  scrollAnimation,
  showSettings = false,
  showClose = false,
  onSettingsPress = () => {},
  onClose = () => {},
}) {
  return (
    <ScreenHeader
      heading={(
        user.profile.username
          ? `@${user.profile.username}`
          : user.email
      )}
      headingStyle={{
        color: scrollAnimation.interpolate({
          inputRange: [0, PULL_UP_DISTANCE],
          outputRange: ['#FFFFFF', '#000000'],
          extrapolate: 'clamp',
        }),
      }}
      rightElement={showSettings ? (
        <BorderlessButton onPress={onSettingsPress}>
          <SettingsIcon
            width={22}
            height={22}
            fill={
              scrollAnimation.interpolate({
                inputRange: [0, PULL_UP_DISTANCE],
                outputRange: ['#FFFFFF', '#000000'],
                extrapolate: 'clamp',
              })
            }
          />
        </BorderlessButton>
      ) : showClose ? (
        <BorderlessButton onPress={onClose}>
          <CloseIcon
            width={22}
            height={22}
            fill={
              scrollAnimation.interpolate({
                inputRange: [0, PULL_UP_DISTANCE],
                outputRange: ['#FFFFFF', '#000000'],
                extrapolate: 'clamp',
              })
            }
          />
        </BorderlessButton>
      ) : <></>}
    />
  );
}

const styles = StyleSheet.create({
});

export default ProfileHeader;
