import * as React from 'react';
import { StyleSheet, Text } from 'react-native';
import * as Linking from 'expo-linking';

const Link = ({ href, children }) => {
  return (
    <Text
      style={styles.link}
      onPress={() => Linking.openURL(href)}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  link: {
    textDecorationLine: 'underline',
  },
});

export default Link;
