import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import ScreenHeader from '~/components/ScreenHeader';
import SettingsIcon from '@shared/components/icons/SettingsIcon';
import ArrowLeftIcon from '@shared/components/icons/ArrowLeftIcon';
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
      leftElement={
        showClose ? (
          <BorderlessButton onPress={onClose}>
            <ArrowLeftIcon
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
        ) : <></>
      }
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
      ) : <></> 
      }
    />
  );
}

const styles = StyleSheet.create({
});

export default ProfileHeader;
