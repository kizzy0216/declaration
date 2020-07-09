import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import DotsHeader from '~/components/DotsHeader';
import AuthenticationHomeScreen from '~/screens/AuthenticationHomeScreen';
import AuthenticationSignInScreen from '~/screens/AuthenticationSignInScreen';
import AuthenticationSignInFeedbackScreen from '~/screens/AuthenticationSignInFeedbackScreen';
import NetworkAccessRequestScreen from '~/screens/NetworkAccessRequestScreen';
import NetworkAccessRequestFeedbackScreen from '~/screens/NetworkAccessRequestFeedbackScreen';

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
          home: 'AuthenticationHome',
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
        name="NetworkAccessRequest"
        component={NetworkAccessRequestScreen}
      />
      <Stack.Screen
        name="NetworkAccessRequestFeedback"
        component={NetworkAccessRequestFeedbackScreen}
      />
    </Stack.Navigator>
  );
}

export default AuthenticationNavigator;
