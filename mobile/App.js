import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from '~/hooks/useCachedResources';
import RootNavigator from '~/navigation/RootNavigator';
import AuthenticationNavigator from '~/navigation/AuthenticationNavigator';
import LinkingConfiguration from '~/navigation/LinkingConfiguration';

const Stack = createStackNavigator();

function App(props) {
  const isLoadingComplete = useCachedResources();

  const isSignedIn = false;
  const hasSelectedNetwork = false;

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <View style={styles.container}>
          <NavigationContainer linking={LinkingConfiguration}>
            <Stack.Navigator headerMode="none">
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
