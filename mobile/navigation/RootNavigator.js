import React, { useRef, useEffect, useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// import {
//   View,
//   Text,
// } from 'react-native';
import { AppState } from 'react-native';
import { TransitionPresets } from '@react-navigation/stack';

import CreateNavigator from '~/navigation/CreateNavigator';
import NetworkTabNavigator from '~/navigation/NetworkTabNavigator';
import SettingsScreen from '~/screens/SettingsScreen';
import ContactUsScreen from '~/screens/ContactUsScreen';
import PartnershipsScreen from '~/screens/PartnershipsScreen';
import PrivacyPolicyScreen from '~/screens/PrivacyPolicyScreen';
import TermsOfUseScreen from '~/screens/TermsOfUseScreen';
import CopyrightScreen from '~/screens/CopyrightScreen';
import CommunityGuidelinesScreen from '~/screens/CommunityGuidelinesScreen';
import NetworkAccessRequestScreen from '~/screens/NetworkAccessRequestScreen';
import NetworkAccessRequestFeedbackScreen from '~/screens/NetworkAccessRequestFeedbackScreen';
import NetworkMembershipSelectScreen from '~/screens/NetworkMembershipSelectScreen';
import NetworkMembershipRequestScreen from '~/screens/NetworkMembershipRequestScreen';
import NetworkMembershipRequestFeedbackScreen from '~/screens/NetworkMembershipRequestFeedbackScreen';
import NetworkMembershipInvitationScreen from '~/screens/NetworkMembershipInvitationScreen';
import NetworkMembershipInvitationAcceptScreen from '~/screens/NetworkMembershipInvitationAcceptScreen';
import MessagingHomeScreen from '~/screens/Messaging/MessagingHomeScreen';
import NewConversationScreen from '~/screens/Messaging/NewConversationScreen';
import NewLoopScreen from '~/screens/Messaging/NewLoopScreen';
import ChatScreen from '~/screens/Messaging/ChatScreen';
import MembersScreen from '~/screens/MembersScreen';
import MemberScreen from '~/screens/MemberScreen';
import EventsScreen from '~/screens/EventsScreen';
import ContentViewerScreen from '~/screens/ContentViewerScreen';
import UserOnboardingWelcomeScreen from '~/screens/UserOnboardingWelcomeScreen';
import UserOnboardingNameScreen from '~/screens/UserOnboardingNameScreen';
import UserOnboardingUsernameScreen from '~/screens/UserOnboardingUsernameScreen';
import UserOnboardingDateOfBirthScreen from '~/screens/UserOnboardingDateOfBirthScreen';
import UserOnboardingGenderScreen from '~/screens/UserOnboardingGenderScreen';
import UserOnboardingLocationScreen from '~/screens/UserOnboardingLocationScreen';
import UserOnboardingProfileWelcomeScreen from '~/screens/UserOnboardingProfileWelcomeScreen';
import UserOnboardingPhotoScreen from '~/screens/UserOnboardingPhotoScreen';
import UserOnboardingPersonalBioScreen from '~/screens/UserOnboardingPersonalBioScreen';
import UserOnboardingEducationalInstitutionScreen from '~/screens/UserOnboardingEducationalInstitutionScreen';
import UserOnboardingWorkPlaceScreen from '~/screens/UserOnboardingWorkPlaceScreen';
import UserOnboardingWorkTitleScreen from '~/screens/UserOnboardingWorkTitleScreen';
import UserOnboardingWorkBioScreen from '~/screens/UserOnboardingWorkBioScreen';
import NetworkBlockedModal from '~/components/NetworkBlockedModal';
// import { UserContext } from '~/contexts/UserContext';
import { NetworkContextProvider } from '~/contexts/NetworkContext';
import { ContentTilePagerContextProvider } from '~/contexts/ContentTilePagerContext';
import { CreateContentContextProvider } from '~/contexts/CreateContentContext';
import { MessageContextProvider } from '~/contexts/MessageContext';
import { UserContext } from '../contexts/UserContext';
import { useMutation } from 'urql';
const Stack = createStackNavigator();

const SetOnlineStatus = `
  mutation SetOnlineStatus($uuid: uuid!, $last_seen_at: timestamptz = "now()") {
    update_user_by_pk(pk_columns: {uuid: $uuid}, _set: {last_seen_at: $last_seen_at}) {
      uuid
    }
  }
`

function RootNavigator({ navigation }) {
  const appState = useRef(AppState.currentState);
  const {user} = useContext(UserContext);
  const [_, updateStatus] = useMutation(SetOnlineStatus);

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('state', () => {
  //     updateStatus({uuid: user.uuid})
  //   });

  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);
    // console.log('ADD TIMER')
    const statusTimer = window.setInterval( () => {
      updateStatus({uuid: user.uuid})
    }, 60000)
    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
      clearInterval(statusTimer);
    };
  }, []);

  const _handleAppStateChange = (nextAppState) => {
    if (appState.current.match(/inactive|background/) && nextAppState === "active") {
      updateStatus({uuid: user.uuid})
    } else {
      updateStatus({
        uuid: user.uuid,
        last_seen_at: new Date(new Date().setDate(new Date().getDate()-1)) // yesterday
      })
    }
    appState.current = nextAppState;
    // console.log("AppState", appState.current);
  };

  return (
  <NetworkContextProvider>
    <MessageContextProvider>
    <CreateContentContextProvider>
      <ContentTilePagerContextProvider>
        <NetworkBlockedModal />

        <Stack.Navigator
          initialRouteName="UserResolution"
          headerMode="none"
        >
          <Stack.Screen
            name="UserOnboardingWelcome"
            component={UserOnboardingWelcomeScreen}
          />
          <Stack.Screen
            name="UserOnboardingName"
            component={UserOnboardingNameScreen}
          />
          <Stack.Screen
            name="UserOnboardingUsername"
            component={UserOnboardingUsernameScreen}
          />
          <Stack.Screen
            name="UserOnboardingDateOfBirth"
            component={UserOnboardingDateOfBirthScreen}
          />
          <Stack.Screen
            name="UserOnboardingGender"
            component={UserOnboardingGenderScreen}
          />
          <Stack.Screen
            name="UserOnboardingProfileWelcome"
            component={UserOnboardingProfileWelcomeScreen}
          />
          <Stack.Screen
            name="UserOnboardingPhoto"
            component={UserOnboardingPhotoScreen}
          />
          <Stack.Screen
            name="UserOnboardingLocation"
            component={UserOnboardingLocationScreen}
          />
          <Stack.Screen
            name="UserOnboardingPersonalBio"
            component={UserOnboardingPersonalBioScreen}
          />
          <Stack.Screen
            name="UserOnboardingEducationalInstitution"
            component={UserOnboardingEducationalInstitutionScreen}
          />
          <Stack.Screen
            name="UserOnboardingWorkPlace"
            component={UserOnboardingWorkPlaceScreen}
          />
          <Stack.Screen
            name="UserOnboardingWorkTitle"
            component={UserOnboardingWorkTitleScreen}
          />
          <Stack.Screen
            name="UserOnboardingWorkBio"
            component={UserOnboardingWorkBioScreen}
          />
          <Stack.Screen
            name="NetworkTab"
            component={NetworkTabNavigator}
          />
          <Stack.Screen
            name="Create"
            component={CreateNavigator}
            options={{
              ...TransitionPresets.ModalSlideFromBottomIOS,
            }}
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
            initialParams={{
              shouldRedirect: false,
            }}
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
            component={MessagingHomeScreen}
          />
          <Stack.Screen
            name="NewConversation"
            component={NewConversationScreen}
            options={{
              ...TransitionPresets.ModalSlideFromBottomIOS,
            }}
          />
          <Stack.Screen
            name="NewLoop"
            component={NewLoopScreen}
            options={{
              ...TransitionPresets.ModalSlideFromBottomIOS,
            }}
          />
          <Stack.Screen
            name="ChatScreen"
            component={ChatScreen}
          />
          <Stack.Screen
            name="ContentViewer"
            component={ContentViewerScreen}
          />
          <Stack.Screen
            name="Members"
            component={MembersScreen}
          />
          <Stack.Screen
            name="Member"
            component={MemberScreen}
          />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
          />
          <Stack.Screen
            name="ContactUs"
            component={ContactUsScreen}
          />
          <Stack.Screen
            name="Partnerships"
            component={PartnershipsScreen}
          />
          <Stack.Screen
            name="PrivacyPolicy"
            component={PrivacyPolicyScreen}
          />
          <Stack.Screen
            name="TermsOfUse"
            component={TermsOfUseScreen}
          />
          <Stack.Screen
            name="Copyright"
            component={CopyrightScreen}
          />
          <Stack.Screen
            name="CommunityGuidelines"
            component={CommunityGuidelinesScreen}
          />
        </Stack.Navigator>
      </ContentTilePagerContextProvider>
    </CreateContentContextProvider>
    </MessageContextProvider>
  </NetworkContextProvider>
  );
}

export default RootNavigator;
