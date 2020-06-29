import React from 'react';
import { Text, StyleSheet } from 'react-native';

function DisplayHeading({ children, ...props }) {
  return (
    <Text {...props} style={[props.style, styles.displayHeading]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  displayHeading: {
    fontSize: 40,
    fontFamily: 'Requiem-Display',
    lineHeight: 45, // NOTE: buggy on Android
  },
});

export default DisplayHeading;
