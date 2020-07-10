import React, { useState, useEffect, useMemo } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as UrqlProvider} from 'urql';

import {
  urqlClient,
  hydrateJWT,
  getUser,
} from '~/utils/api';
import useCachedResources from '~/hooks/useCachedResources';
import RootNavigator from '~/navigation/RootNavigator';
import AuthenticationNavigator from '~/navigation/AuthenticationNavigator';
import LinkingConfiguration from '~/navigation/LinkingConfiguration';
import { UserContextProvider } from '~/contexts/UserContext';

const Stack = createStackNavigator();

function App(props) {
  const [
    hasHydratedAuthentication,
    setHasHydratedAuthentication,
  ] = useState(false);
  const [
    hasLoadedUser,
    setHasLoadedUser,
  ] = useState(false);
  const [
    user,
    setUser,
  ] = useState({});
  const hasLoadedResources = useCachedResources();

  useEffect(() => {
    hydrateJWT().then(() => {
      setHasHydratedAuthentication(true);
    });

    getUser().then((user) => {
      setUser(user || {});
      setHasLoadedUser(true);
    });
  }, []);

  if (!(
    hasLoadedResources &&
    hasHydratedAuthentication &&
    hasLoadedUser
  )) {
    return null;
  } else {
    return (
      <UrqlProvider value={urqlClient}>
        <UserContextProvider userUuid={user.uuid}>
          <SafeAreaProvider>
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
                <Stack.Navigator
                  headerMode="none"
                >
                  <Stack.Screen
                    name="AuthenticationRoot"
                    component={AuthenticationNavigator}
                  />
                  <Stack.Screen
                    name="Root"
                    component={RootNavigator}
                  />
                </Stack.Navigator>
              </NavigationContainer>
            </View>
          </SafeAreaProvider>
        </UserContextProvider>
      </UrqlProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
