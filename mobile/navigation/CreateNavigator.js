import React  from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import CreateContentSelectTemplateScreen from '~/screens/CreateContentSelectTemplateScreen';
import CreateContentTextScreen from '~/screens/CreateContentTextScreen';
import CreateContentSingleChoicePollScreen from '~/screens/CreateContentSingleChoicePollScreen';
import CreateContentMultipleChoicePollScreen from '~/screens/CreateContentMultipleChoicePollScreen';

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
    </Stack.Navigator>
  );
}

export default CreateNavigator;
