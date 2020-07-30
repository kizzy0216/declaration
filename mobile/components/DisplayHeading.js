import React from 'react';
import { Text, StyleSheet } from 'react-native';

function DisplayHeading({
  children,
  size = 'medium', // medium, large
  ...props
}) {
  return (
    <Text
      {...props}
      style={[
        props.style,
        styles.displayHeading,
        styles[size],
      ]}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  displayHeading: {
    fontFamily: 'Requiem-Display',
  },
  medium: {
    fontSize: 40,
    lineHeight: 40,
  },
  large: {
    fontSize: 49,
    lineHeight: 49,
  },
});

export default DisplayHeading;
