import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

function PersonalBio({
  username,
  personalBio = '',
}) {
  return (
    <View style={styles.container}>
      <Text>
        <Text style={styles.username}>
          @{username}&nbsp;&nbsp;
        </Text>
        <Text style={styles.personalBio}>
          {personalBio}
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  personalBio: {
    fontSize: 14,
    lineHeight: 20,
  },
  username: {
    fontWeight: 'bold',
    marginRight: 10,
    fontSize: 14,
    lineHeight: 20,
  },
});

export default PersonalBio;
