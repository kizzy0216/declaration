import * as React from 'react';
import { View, StyleSheet } from 'react-native';

const TabBarIcon = ({ isFocused, children }) => {
  return (
    <View style={styles.tabBarIcon}>
      {isFocused &&
        <View style={styles.dot} />
      }

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarIcon: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  dot: {
    width: 5,
    height: 5,
    backgroundColor: 'black',
    borderRadius: 3,
    position: 'absolute',
    top: -10,
  },
});

export default TabBarIcon;
