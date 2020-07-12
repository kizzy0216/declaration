import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import DotsHeader from '~/components/DotsHeader';
import AuthenticationHomeScreen from '~/screens/AuthenticationHomeScreen';
import AuthenticationLogInScreen from '~/screens/AuthenticationLogInScreen';
import AuthenticationLogInFeedbackScreen from '~/screens/AuthenticationLogInFeedbackScreen';
import NetworkAccessRequestScreen from '~/screens/NetworkAccessRequestScreen';
import NetworkAccessRequestFeedbackScreen from '~/screens/NetworkAccessRequestFeedbackScreen';
import NetworkMembershipInvitationAcceptScreen from '~/screens/NetworkMembershipInvitationAcceptScreen';
import UserResolutionScreen from '~/screens/UserResolutionScreen';
import { UserContext } from '~/contexts/UserContext';

const Stack = createStackNavigator();

function AuthenticationNavigator({ navigation, route }) {
  const { isAuthenticated } = useContext(UserContext);

  const initialRouteName = (
    isAuthenticated ? 'UserResolution' : 'AuthenticationHome'
  );

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      headerMode="screen"
      screenOptions={{
        cardShadowEnabled: false,
        header: ({ scene }) => DotsHeader({
          navigation,
          scene,
          sceneNames: [
            'AuthenticationLogIn',
            'AuthenticationLogInFeedback',
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
      <Stack.Screen
        name="UserResolution"
        component={UserResolutionScreen}
      />
    </Stack.Navigator>
  );
}

export default AuthenticationNavigator;
