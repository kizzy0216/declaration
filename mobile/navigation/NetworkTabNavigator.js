import React, { useEffect, useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import FeedScreen from '~/screens/FeedScreen';
import ArchiveScreen from '~/screens/ArchiveScreen';
import NotificationsScreen from '~/screens/NotificationsScreen';
import ProfileScreen from '~/screens/ProfileScreen';
import StorybookScreen from '~/screens/StorybookScreen';
import TabBar from '~/components/TabBar';
import TabBarIcon from '~/components/TabBarIcon';
import { InterfaceContext } from '~/contexts/InterfaceContext';
import { ContentTilePagerContext } from '~/contexts/ContentTilePagerContext';

import PlusInSquareIcon from '@shared/components/icons/PlusInSquareIcon';
import NotificationsIcon from '@shared/components/icons/NotificationsIcon';
import VennDiagramIcon from '@shared/components/icons/VennDiagramIcon';
import PersonIcon from '@shared/components/icons/PersonIcon';
import SearchIcon from '@shared/components/icons/SearchIcon';

const BottomTab = createBottomTabNavigator();

const INITIAL_ROUTE_NAME = 'Feed';
const RENDER_STORYBOOK_TAB = false;

function DummyScreen() {
  return null;
}

function NetworkTabNavigator({ navigation, route }) {
  const {
    isVisible: isInterfaceVisible,
  } = useContext(InterfaceContext);
  const { scrollToIndex } = useContext(ContentTilePagerContext);

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
          tabBarVisible: isInterfaceVisible,
        }}
        listeners={() => ({
          tabPress: () => {
            // scroll to top on press and FeedScreen visible
            if (!route.state) {
              scrollToIndex({ index: 0, withAnimation: true });
            } else if (route.state.index === 0) {
              scrollToIndex({ index: 0, withAnimation: true });
            }
          }
        })}
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
                fill="rgba(0,0,0,0.2)"
              />
            </TabBarIcon>
          ),
        }}
        listeners={() => ({
          tabPress: (event) => {
            event.preventDefault();
          }
        })}
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
