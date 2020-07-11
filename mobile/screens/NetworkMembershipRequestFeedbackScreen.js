import React from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import DisplayHeading from '~/components/DisplayHeading';

function NetworkMembershipRequestFeedbackScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <DisplayHeading style={{ width: 250, marginBottom: 40 }}>
        Request Sent
      </DisplayHeading>

      <Text style={styles.subHeading}>
        We’ve notified the network adminstrator to grant you access. Once
        they accept your request, you’ll receive an email invite to join.
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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

export default NetworkMembershipRequestFeedbackScreen;
