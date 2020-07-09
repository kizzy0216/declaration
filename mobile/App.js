import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as UrqlProvider} from 'urql';

import { urqlClient } from '~/utils/api';
import useCachedResources from '~/hooks/useCachedResources';
import RootNavigator from '~/navigation/RootNavigator';
import AuthenticationNavigator from '~/navigation/AuthenticationNavigator';
import LinkingConfiguration from '~/navigation/LinkingConfiguration';

const Stack = createStackNavigator();

function App(props) {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <UrqlProvider value={urqlClient}>
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
