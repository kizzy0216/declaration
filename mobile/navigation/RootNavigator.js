import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '~/components/TabBarIcon';
import FeedScreen from '~/screens/FeedScreen';
import CreateScreen from '~/screens/CreateScreen';
import StorybookScreen from '~/screens/StorybookScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Feed';

function RootNavigator({ navigation, route }) {
  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          title: 'Feed',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-pulse" />,
        }}
      />
      <BottomTab.Screen
        name="Create"
        component={CreateScreen}
        options={{
          title: 'Create',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-add-circle" />,
        }}
      />
      {process.env.NODE_ENV !== 'production' &&
        <BottomTab.Screen
          name="Storybook"
          component={StorybookScreen}
          options={{
            title: 'Storybook',
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-book" />,
          }}
        />
      }
    </BottomTab.Navigator>
  );
}

export default RootNavigator;
