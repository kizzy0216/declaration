import React from 'react';
import { View, StyleSheet } from 'react-native';

import Colors from '~/constants/Colors';

function Dot({
  isActive = false,
  ...props
}) {
  return (
    <View
      {...props}
      style={[styles.dot, isActive && styles.active, props.style]}
    />
  );
}

const styles = StyleSheet.create({
  dot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: '#C5C5C5',
  },
  active: {
    backgroundColor: Colors.darkGray,
  },
});

export default Dot;
