import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import CreateContentSelectTemplateScreen from '~/screens/CreateContentSelectTemplateScreen';
import CreateContentTextScreen from '~/screens/CreateContentTextScreen';
import CreateContentSingleChoicePollScreen from '~/screens/CreateContentSingleChoicePollScreen';
import CreateContentMultipleChoicePollScreen from '~/screens/CreateContentMultipleChoicePollScreen';
import CreateContentMediaScreen from '~/screens/CreateContentMediaScreen';
import CreateContentOpportunityListingScreen from '~/screens/CreateContentOpportunityListingScreen';
import CreateContentAvailabilityListingScreen from '~/screens/CreateContentAvailabilityListingScreen';
import CreateContentSessionScreen from '~/screens/CreateContentSessionScreen';
import CreateContentEventScreen from '~/screens/CreateContentEventScreen';
import CreateContentPaylockScreen from '~/screens/CreateContentPaylockScreen';
import CreateContentMetaScreen from '~/screens/CreateContentMetaScreen';

const Stack = createStackNavigator();

function CreateNavigator({ navigation, route }) {
  return (
    <Stack.Navigator
      initialRouteName="CreateContentSelectTemplate"
      headerMode="none"
    >
      <Stack.Screen
        name="CreateContentSelectTemplate"
        component={CreateContentSelectTemplateScreen}
      />
      <Stack.Screen
        name="CreateContentText"
        component={CreateContentTextScreen}
      />
      <Stack.Screen
        name="CreateContentSingleChoicePoll"
        component={CreateContentSingleChoicePollScreen}
      />
      <Stack.Screen
        name="CreateContentMultipleChoicePoll"
        component={CreateContentMultipleChoicePollScreen}
      />
      <Stack.Screen
        name="CreateContentMedia"
        component={CreateContentMediaScreen}
      />
      <Stack.Screen
        name="CreateContentOpportunityListing"
        component={CreateContentOpportunityListingScreen}
      />
      <Stack.Screen
        name="CreateContentAvailabilityListing"
        component={CreateContentAvailabilityListingScreen}
      />
      <Stack.Screen
        name="CreateContentSession"
        component={CreateContentSessionScreen}
      />
      <Stack.Screen
        name="CreateContentEvent"
        component={CreateContentEventScreen}
      />
      <Stack.Screen
        name="CreateContentPaylock"
        component={CreateContentPaylockScreen}
      />
      <Stack.Screen
        name="CreateContentMeta"
        component={CreateContentMetaScreen}
      />
    </Stack.Navigator>
  );
}

export default CreateNavigator;
