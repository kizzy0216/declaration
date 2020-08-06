import React  from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import CreateContentSelectTemplateScreen from '~/screens/CreateContentSelectTemplateScreen';

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
    </Stack.Navigator>
  );
}

export default CreateNavigator;
