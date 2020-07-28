import React from 'react';
import { Text, StyleSheet } from 'react-native';

function Paragraph({
  size = 'medium', // small, medium, large
  children,
}) {
  return (
    <Text style={styles[size]}>
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
