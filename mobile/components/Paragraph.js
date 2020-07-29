import React from 'react';
import { Text, StyleSheet } from 'react-native';

function Paragraph({
  size = 'medium', // small, medium, large
  style,
  children,
}) {
  return (
    <Text style={[styles[size], style]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  small: {
    fontSize: 14,
    lineHeight: 21,
  },
  medium: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default Paragraph;
