import React, {
  useRef,
  useEffect,
} from 'react';
import {
  Animated,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function TabBar({ state, descriptors, navigation }) {
  const animation = useRef(new Animated.Value(1)).current;
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  const { tabBarVisible = true } = focusedOptions;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: (tabBarVisible ? 1 : 0),
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [tabBarVisible]);

  return (
    <Animated.View
      style={{
        opacity: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
        }),
        transform: [{
          translateY: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [100, 0],
          }),
        }],
      }}
      pointerEvents={tabBarVisible ? 'auto' : 'none'}
    >
      <SafeAreaView
        edges={["bottom"]}
        style={styles.safeArea}
        contentContainerStyle={styles.safeAreaContainer}
      >
        <View style={styles.tabBar}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];

            const isFocused = (state.index === index);

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
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
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    paddingTop: 30,
    paddingBottom: 10,
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
