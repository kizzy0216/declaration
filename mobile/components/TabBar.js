import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function TabBar({ state, descriptors, navigation }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <SafeAreaView
      edges={["bottom"]}
      style={styles.safeArea}
      contentContainerStyle={styles.safeAreaContainer}
    >
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];

          // tab is focused if state index matches,
          // and if matched route has falsey params
          // this allows screen reusability
          // (e.g. ProfileScreen used to display authenticated user and a
          // network member)
          const isFocused = (
            state.index === index &&
            (
              !state.routes[index].params ||
              Object
                .values(state.routes[index].params)
                .filter(x => x)
                .length === 0
            )
          );

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // navigate with cleared params
              navigation.navigate(
                route.name,
                Object.keys(route.params || {}).reduce((accumulator, key) => {
                  accumulator[key] = null;
                  return accumulator;
                }, {}),
              );
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityStates={isFocused ? ['selected'] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1 }}
            >
              {options.tabBarIcon({ isFocused })}
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  safeArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: 'white',
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
  safeAreaContainer: {
    backgroundColor: 'gray',
    overflow: 'visible',
  },
});

export default TabBar;
