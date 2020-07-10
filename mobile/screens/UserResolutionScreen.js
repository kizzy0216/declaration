import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StackActions } from '@react-navigation/native';

import { UserContext } from '~/contexts/UserContext';

function UserResolutionScreen ({ navigation }) {
  const { isAuthenticated } = useContext(UserContext);

  // TODO check if user has a profile, if not show Onboarding flow
  useEffect(() => {
    if (isAuthenticated) {
      navigation.dispatch(
        StackActions.replace('Root')
      );
    }
  }, [isAuthenticated]);

  return (
    <View>
      <Text>
        Hi
      </Text>
    </View>
  );
}

export default UserResolutionScreen;
