import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StackActions } from '@react-navigation/native';

import { UserContext } from '~/contexts/UserContext';

function UserResolutionScreen ({ navigation }) {
  const {
    isFetching,
    isAuthenticated,
  } = useContext(UserContext);

  // TODO check if user has a profile, if not show Onboarding flow
  useEffect(() => {
    if (!isFetching && isAuthenticated) {
      navigation.dispatch(
        StackActions.replace('Root')
      );
    }
  }, [isFetching, isAuthenticated]);

  return (
    <View />
  );
}

export default UserResolutionScreen;
