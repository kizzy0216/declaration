import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StackActions } from '@react-navigation/native';

import { UserContext } from '~/contexts/UserContext';

function UserResolutionScreen ({ navigation }) {
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user.uuid) {
      navigation.dispatch(
        StackActions.replace('Root')
      );
    }
  }, [user]);

  return (
    <View>
      <Text>
        Hi
      </Text>
    </View>
  );
}

export default UserResolutionScreen;
