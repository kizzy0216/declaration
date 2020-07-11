import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackActions } from '@react-navigation/native';

import Button from '~/components/Button';
import { UserContext } from '~/contexts/UserContext';

function SettingsScreen({ navigation }) {
  const { logOut } = useContext(UserContext);

  function handleLogOut() {
    logOut();

    navigation.dispatch(
      StackActions.replace('AuthenticationRoot')
    );
  }

  return (
    <SafeAreaView>
      <Text>Settings</Text>
      <Button
        label="Log Out"
        onPress={handleLogOut}
      />
    </SafeAreaView>
  );
}

export default SettingsScreen;
