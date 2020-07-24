import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StackActions } from '@react-navigation/native';

import { UserContext } from '~/contexts/UserContext';

function UserResolutionScreen ({ navigation, route }) {
  const {
    isFetching,
    isAuthenticated,
    hasProfile,
    hasNetworks,
  } = useContext(UserContext);

  useEffect(() => {
    if (isFetching) {
      return;
    }

    if (!isAuthenticated) {
      return navigation.dispatch(
        StackActions.replace('Authentication', {
          screen: 'AuthenticationHome'
        })
      );
    }

    if (!hasProfile) {
      return navigation.dispatch(
        StackActions.replace('Root', {
          screen: 'UserOnboardingWelcomeScreen'
        })
      );
    }

    if (!hasNetworks) {
      return navigation.dispatch(
        StackActions.replace('Root', {
          screen: 'NetworkMembershipSelect'
        })
      );
    }

    return navigation.dispatch(
      StackActions.replace('Root', {
        screen: 'NetworkTab'
      })
    );
  }, [isFetching, isAuthenticated, hasProfile, hasNetworks]);

  return (
    <View />
  );
}

export default UserResolutionScreen;
