import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import FeedScreen from '~/screens/FeedScreen';
import ArchiveScreen from '~/screens/ArchiveScreen';
import NotificationsScreen from '~/screens/NotificationsScreen';
import ProfileScreen from '~/screens/ProfileScreen';
import StorybookScreen from '~/screens/StorybookScreen';
import TabBar from '~/components/TabBar';
import TabBarIcon from '~/components/TabBarIcon';

import PlusInSquareIcon from 'Shared/components/icons/PlusInSquareIcon';
import NotificationsIcon from 'Shared/components/icons/NotificationsIcon';
import VennDiagramIcon from 'Shared/components/icons/VennDiagramIcon';
import PersonIcon from 'Shared/components/icons/PersonIcon';
import SearchIcon from 'Shared/components/icons/SearchIcon';

const BottomTab = createBottomTabNavigator();

const INITIAL_ROUTE_NAME = 'Feed';
const RENDER_STORYBOOK_TAB = false;

function DummyScreen() {
  return null;
}

function NetworkTabNavigator({ navigation, route }) {
  return (
    <BottomTab.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      tabBar={props => <TabBar {...props} />}
    >
      <BottomTab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          tabBarIcon: ({ isFocused }) => (
            <TabBarIcon isFocused={isFocused}>
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
          tabBarIcon: ({ isFocused }) => (
            <TabBarIcon isFocused={isFocused}>
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
        name="DummyCreate"
        component={DummyScreen}
        options={{
          tabBarIcon: ({ isFocused }) => (
            <TabBarIcon isFocused={isFocused}>
              <PlusInSquareIcon
                width={24}
                height={24}
                fill="black"
              />
            </TabBarIcon>
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            event.preventDefault();

            navigation.navigate('Root', {
              screen: 'Create',
            });
          }
        })}
      />
      <BottomTab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          tabBarIcon: ({ isFocused }) => (
            <TabBarIcon isFocused={isFocused}>
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
          tabBarIcon: ({ isFocused }) => (
            <TabBarIcon isFocused={isFocused}>
              <PersonIcon
                width={24}
                height={24}
                fill="black"
              />
            </TabBarIcon>
          ),
        }}
        listeners={({ navigation }) => ({
          tabLongPress: () => {
            navigation.navigate('Members');
          }
        })}
      />
      {process.env.NODE_ENV !== 'production' && RENDER_STORYBOOK_TAB &&
        <BottomTab.Screen
          name="Storybook"
          component={StorybookScreen}
          options={{
            tabBarIcon: ({ isFocused }) => (
              <TabBarIcon isFocused={isFocused} name="md-book" />
            ),
          }}
        />
      }
    </BottomTab.Navigator>
  );
}

export default NetworkTabNavigator;
