import React from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import DisplayHeading from '~/components/DisplayHeading';

function NetworkAccessRequestFeedbackScreen() {
  return (
    <SafeAreaView style={styles.outer}>
      <View style={styles.container}>
        <DisplayHeading style={{ width: 250, marginBottom: 40 }}>
          Request Sent
        </DisplayHeading>

        <Text style={styles.subHeading}>
          We’ve notified a representative to grant you access. Hang tight,
          they will be contacting you shortly.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  subHeading: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    width: 300,
  }
});

export default NetworkAccessRequestFeedbackScreen;
