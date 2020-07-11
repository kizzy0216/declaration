import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import FeedScreen from '~/screens/FeedScreen';
import ArchiveScreen from '~/screens/ArchiveScreen';
import CreateScreen from '~/screens/CreateScreen';
import NotificationsScreen from '~/screens/NotificationsScreen';
import ProfileScreen from '~/screens/ProfileScreen';
import StorybookScreen from '~/screens/StorybookScreen';
import TabBarIcon from '~/components/TabBarIcon';

import { NetworkContextProvider } from '~/contexts/NetworkContext';

const BottomTab = createBottomTabNavigator();

const INITIAL_ROUTE_NAME = 'Feed';
const RENDER_STORYBOOK_TAB = false;

function NetworkTabNavigator({ navigation, route }) {
  return (
    <NetworkContextProvider>
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
          name="Archive"
          component={ArchiveScreen}
          options={{
            title: 'Archive',
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-search" />,
          }}
        />
        <BottomTab.Screen
          name="Create"
          component={CreateScreen}
          options={{
            title: 'Create',
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-add" />,
          }}
        />
        <BottomTab.Screen
          name="Notifications"
          component={NotificationsScreen}
          options={{
            title: 'Notifications',
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-notifications" />,
          }}
        />
        <BottomTab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: 'Profile',
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-person" />,
          }}
        />
        {process.env.NODE_ENV !== 'production' && RENDER_STORYBOOK_TAB &&
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
    </NetworkContextProvider>
  );
}

export default NetworkTabNavigator;
