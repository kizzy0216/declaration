import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import AuthenticationHomeScreen from '~/screens/AuthenticationHomeScreen.js';
import AuthenticationSignInScreen from '~/screens/AuthenticationSignInScreen.js';
import NetworkRequestAccessScreen from '~/screens/NetworkRequestAccessScreen.js';

const Stack = createStackNavigator();

function AuthenticationNavigator({ navigation, route }) {
  return (
    <Stack.Navigator
      initialRouteName="AuthenticationHome"
      headerMode="none"
    >
      <Stack.Screen
        name="AuthenticationHome"
        component={AuthenticationHomeScreen}
      />
      <Stack.Screen
        name="AuthenticationSignIn"
        component={AuthenticationSignInScreen}
      />
      <Stack.Screen
        name="RequestNetworkAccess"
        component={NetworkRequestAccessScreen}
      />
    </Stack.Navigator>
  );
}

export default AuthenticationNavigator;
