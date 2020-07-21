import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import FeedScreen from '~/screens/FeedScreen';
import ArchiveScreen from '~/screens/ArchiveScreen';
import CreateScreen from '~/screens/CreateScreen';
import NotificationsScreen from '~/screens/NotificationsScreen';
import ProfileScreen from '~/screens/ProfileScreen';
import StorybookScreen from '~/screens/StorybookScreen';
import TabBarIcon from '~/components/TabBarIcon';

import PlusInSquareIcon from 'Shared/components/icons/PlusInSquareIcon';
import NotificationsIcon from 'Shared/components/icons/NotificationsIcon';
import VennDiagramIcon from 'Shared/components/icons/VennDiagramIcon';
import PersonIcon from 'Shared/components/icons/PersonIcon';
import SearchIcon from 'Shared/components/icons/SearchIcon';

const BottomTab = createBottomTabNavigator();

const INITIAL_ROUTE_NAME = 'Feed';
const RENDER_STORYBOOK_TAB = false;

function NetworkTabNavigator({ navigation, route }) {
  return (
    <BottomTab.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      tabBarOptions={{
        showLabel: false,
        activeTintColor: 'black',
        inactiveTintColor: 'black',
        style: {
          paddingTop: 20,
          paddingLeft: 10,
          paddingRight: 10,
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: -10,
          },
          shadowOpacity: 0.1,
          shadowRadius: 40,
          elevation: 20,
          overflow: 'visible',
        },
      }}
    >
      <BottomTab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon isFocused={focused}>
              <VennDiagramIcon
                width={24}
                height={24}
                fill="black"
              />
            </TabBarIcon>
          ),
        }}
      />
      <BottomTab.Screen
        name="Archive"
        component={ArchiveScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon isFocused={focused}>
              <SearchIcon
                width={24}
                height={24}
                fill="black"
              />
            </TabBarIcon>
          ),
        }}
      />
      <BottomTab.Screen
        name="Create"
        component={CreateScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon isFocused={focused}>
              <PlusInSquareIcon
                width={24}
                height={24}
                fill="black"
              />
            </TabBarIcon>
          ),
        }}
      />
      <BottomTab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon isFocused={focused}>
              <NotificationsIcon
                width={24}
                height={24}
                fill="black"
              />
            </TabBarIcon>
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon isFocused={focused}>
              <PersonIcon
                width={24}
                height={24}
                fill="black"
              />
            </TabBarIcon>
          ),
        }}
      />
      {process.env.NODE_ENV !== 'production' && RENDER_STORYBOOK_TAB &&
        <BottomTab.Screen
          name="Storybook"
          component={StorybookScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabBarIcon focused={focused} name="md-book" />
            ),
          }}
        />
      }
    </BottomTab.Navigator>
  );
}

export default NetworkTabNavigator;
