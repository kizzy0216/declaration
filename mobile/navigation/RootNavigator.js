import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  View,
  Text,
} from 'react-native';

import NetworkTabNavigator from '~/navigation/NetworkTabNavigator';
import SettingsScreen from '~/screens/SettingsScreen';
import NetworkAccessRequestScreen from '~/screens/NetworkAccessRequestScreen';
import NetworkAccessRequestFeedbackScreen from '~/screens/NetworkAccessRequestFeedbackScreen';
import NetworkMembershipSelectScreen from '~/screens/NetworkMembershipSelectScreen';
import NetworkMembershipRequestScreen from '~/screens/NetworkMembershipRequestScreen';
import NetworkMembershipRequestFeedbackScreen from '~/screens/NetworkMembershipRequestFeedbackScreen';
import NetworkMembershipInvitationScreen from '~/screens/NetworkMembershipInvitationScreen';
import NetworkMembershipInvitationAcceptScreen from '~/screens/NetworkMembershipInvitationAcceptScreen';
import MessagingScreen from '~/screens/MessagingScreen';
import EventsScreen from '~/screens/EventsScreen';
import NetworkBlockedModal from '~/components/NetworkBlockedModal';
import { UserContext } from '~/contexts/UserContext';
import { NetworkContextProvider } from '~/contexts/NetworkContext';

const Stack = createStackNavigator();

function RootNavigator({ navigation }) {
  const {
    user,
    isAuthenticated,
  } = useContext(UserContext);


  const initialRouteName = (
    (!user.networkUuids ||
    user.networkUuids.length === 0)
      ? 'NetworkMembershipSelect'
      : 'NetworkTabs'
  );

  return (
    <NetworkContextProvider>
      <NetworkBlockedModal />

      <Stack.Navigator
        initialRouteName={initialRouteName}
        headerMode="none"
      >
        <Stack.Screen
          name="NetworkTab"
          component={NetworkTabNavigator}
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
          name="NetworkMembershipInvitation"
          component={NetworkMembershipInvitationScreen}
        />
        <Stack.Screen
          name="NetworkMembershipSelect"
          component={NetworkMembershipSelectScreen}
        />
        <Stack.Screen
          name="NetworkMembershipRequest"
          component={NetworkMembershipRequestScreen}
        />
        <Stack.Screen
          name="NetworkMembershipRequestFeedback"
          component={NetworkMembershipRequestFeedbackScreen}
        />
        <Stack.Screen
          name="NetworkMembershipInvitationAccept"
          component={NetworkMembershipInvitationAcceptScreen}
        />
        <Stack.Screen
          name="Events"
          component={EventsScreen}
        />
        <Stack.Screen
          name="Messaging"
          component={MessagingScreen}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
        />
      </Stack.Navigator>
    </NetworkContextProvider>
  );
}

export default RootNavigator;
