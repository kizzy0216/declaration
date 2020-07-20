import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import DisplayHeading from '~/components/DisplayHeading';
import ScreenHeader from '~/components/ScreenHeader';

function AuthenticationLogInFeedbackScreen({ navigation }) {
  return (
    <SafeAreaView>
      <ScreenHeader
        activePageIndex={1}
        countPages={2}
        onClose={() => navigation.goBack()}
      />
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
    paddingTop: 50,
    paddingRight: 20,
    paddingLeft: 20,
  },
});

export default AuthenticationLogInFeedbackScreen;
