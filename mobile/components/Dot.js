import React from 'react';
import { View, StyleSheet } from 'react-native';

import {
  DARK_GRAY,
} from '~/constants';

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
    backgroundColor: DARK_GRAY,
  },
});

export default Dot;
