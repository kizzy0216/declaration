import React  from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AuthenticationHomeScreen from '~/screens/AuthenticationHomeScreen';
import AuthenticationLogInScreen from '~/screens/AuthenticationLogInScreen';
import AuthenticationLogInFeedbackScreen from '~/screens/AuthenticationLogInFeedbackScreen';
import NetworkAccessRequestScreen from '~/screens/NetworkAccessRequestScreen';
import NetworkAccessRequestFeedbackScreen from '~/screens/NetworkAccessRequestFeedbackScreen';
import NetworkMembershipInvitationAcceptScreen from '~/screens/NetworkMembershipInvitationAcceptScreen';
import UserResolutionScreen from '~/screens/UserResolutionScreen';

const Stack = createStackNavigator();

function AuthenticationNavigator({ navigation, route }) {
  return (
    <Stack.Navigator
      initialRouteName="UserResolution"
      headerMode="screen"
      screenOptions={{
        cardShadowEnabled: false,
        header: () => null,
      }}
    >
      <Stack.Screen
        name="UserResolution"
        component={UserResolutionScreen}
      />
      <Stack.Screen
        name="AuthenticationHome"
        component={AuthenticationHomeScreen}
      />
      <Stack.Screen
        name="AuthenticationLogIn"
        component={AuthenticationLogInScreen}
      />
      <Stack.Screen
        name="AuthenticationLogInFeedback"
        component={AuthenticationLogInFeedbackScreen}
      />
      <Stack.Screen
        name="NetworkAccessRequest"
        component={NetworkAccessRequestScreen}
      />
      <Stack.Screen
        name="NetworkAccessRequestFeedback"
        component={NetworkAccessRequestFeedbackScreen}
      />
      <Stack.Screen
        name="NetworkMembershipInvitationAccept"
        component={NetworkMembershipInvitationAcceptScreen}
      />
    </Stack.Navigator>
  );
}

export default AuthenticationNavigator;
