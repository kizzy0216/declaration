import '~/utils/whyDidYouRender';

import React, {
  useState,
  useEffect,
} from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as UrqlProvider} from 'urql';

import useCachedResources from '~/hooks/useCachedResources';
import RootNavigator from '~/navigation/RootNavigator';
import AuthenticationNavigator from '~/navigation/AuthenticationNavigator';
import LinkingConfiguration from '~/navigation/LinkingConfiguration';
import { UserContextProvider } from '~/contexts/UserContext';
import { InterfaceContextProvider } from '~/contexts/InterfaceContext';
import { urqlClient } from '~/utils/api';

const Stack = createStackNavigator();

function App(props) {
  const hasLoadedResources = useCachedResources();

  if (!hasLoadedResources) {
    return <View style={styles.container} />;
  } else {
    return (
      <UrqlProvider value={urqlClient}>
        <UserContextProvider>
          <SafeAreaProvider>
            <InterfaceContextProvider>
              <View style={styles.container}>
                <NavigationContainer
                  linking={LinkingConfiguration}
                  theme={{
                    ...DefaultTheme,
                    colors: {
                      ...DefaultTheme.colors,
                      background: 'white',
                    },
                  }}
                >
                  <Stack.Navigator headerMode="none">
                    <Stack.Screen
                      name="Authentication"
                      component={AuthenticationNavigator}
                    />
                    <Stack.Screen
                      name="Root"
                      component={RootNavigator}
                      options={{
                        animationEnabled: false,
                      }}
                    />
                  </Stack.Navigator>
                </NavigationContainer>
              </View>
            </InterfaceContextProvider>
          </SafeAreaProvider>
        </UserContextProvider>
      </UrqlProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default App;
