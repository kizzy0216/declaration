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
import { Audio } from 'expo-av';
import * as Sentry from 'sentry-expo';

import useCachedResources from '~/hooks/useCachedResources';
import RootNavigator from '~/navigation/RootNavigator';
import AuthenticationNavigator from '~/navigation/AuthenticationNavigator';
import LinkingConfiguration from '~/navigation/LinkingConfiguration';
import { UserContextProvider } from '~/contexts/UserContext';
import { InterfaceContextProvider } from '~/contexts/InterfaceContext';
import { urqlClient } from '~/utils/api';
import ErrorBoundary from '~/components/ErrorBoundary';

const Stack = createStackNavigator();

function App(props) {
  const hasLoadedResources = useCachedResources();

  useEffect(() => {
    (async () => {
      const t = Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        shouldDuckAndroid: false,
      });
      // console.dir(t);
    })();
    Sentry.init({
      dsn: 'https://18ec0126955c43f9a3ef8e7fe3f2c081@o465757.ingest.sentry.io/5479011', // STAGE
      enableInExpoDevelopment: false,
      debug: false, // Sentry will try to print out useful debugging information if something goes wrong with sending an event. Set this to `false` in production.
    });
  }, []);

  if (!hasLoadedResources) {
    return <View style={styles.container} />;
  } else {
    return (
      <ErrorBoundary>
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
      </ErrorBoundary>
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
