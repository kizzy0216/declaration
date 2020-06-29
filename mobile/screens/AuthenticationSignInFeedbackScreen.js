import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import DisplayHeading from '~/components/DisplayHeading';

function AuthenticationSignInFeedbackScreen() {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <DisplayHeading style={{ width: 250, marginBottom: 40 }}>
          We are an exclusive invite only network.
        </DisplayHeading>

        <DisplayHeading style={{ width: 300 }}>
          Please check your email to confirm your account.
        </DisplayHeading>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default AuthenticationSignInFeedbackScreen;
