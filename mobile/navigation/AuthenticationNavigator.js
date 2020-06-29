import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import DotsHeader from '~/components/DotsHeader';
import AuthenticationHomeScreen from '~/screens/AuthenticationHomeScreen.js';
import AuthenticationSignInScreen from '~/screens/AuthenticationSignInScreen.js';
import AuthenticationSignInFeedbackScreen from '~/screens/AuthenticationSignInFeedbackScreen.js';
import NetworkRequestAccessScreen from '~/screens/NetworkRequestAccessScreen.js';

const Stack = createStackNavigator();

function AuthenticationNavigator({ navigation, route }) {
  return (
    <Stack.Navigator
      initialRouteName="AuthenticationHome"
      headerMode="screen"
      screenOptions={{
        cardShadowEnabled: false,
        header: ({ scene }) => DotsHeader({
          navigation,
          scene,
          sceneNames: [
            'AuthenticationSignIn',
            'AuthenticationSignInFeedback',
          ],
        }),
      }}
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
        name="AuthenticationSignInFeedback"
        component={AuthenticationSignInFeedbackScreen}
      />
      <Stack.Screen
        name="RequestNetworkAccess"
        component={NetworkRequestAccessScreen}
      />
    </Stack.Navigator>
  );
}

export default AuthenticationNavigator;
