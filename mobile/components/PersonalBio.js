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
    <View style={styles.personalBio}>
      <Text style={styles.username}>
        @{username}
      </Text>
      <Text style={styles.personalBio}>
        {personalBio}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  personalBio: {
  },
});

export default PersonalBio;
