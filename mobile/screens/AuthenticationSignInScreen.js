import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackActions } from '@react-navigation/native';

import DisplayHeading from '~/components/DisplayHeading';
import Button from '~/components/Button';
import TextInput from '~/components/TextInput';

function AuthenticationSignInScreen({ navigation }) {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.headingWrapper}>
          <DisplayHeading style={styles.heading}>
            What's your email address?
          </DisplayHeading>
        </View>

        <View style={styles.row}>
          <TextInput
            placeholder="Enter your email address"
            keyboardType="email-address"
          />
        </View>
        <Button
          label="Verify"
          onPress={() =>
            navigation.dispatch(
              StackActions.replace('AuthenticationSignInFeedback')
            )
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  headingWrapper: {
    marginBottom: 40,
  },
  heading: {
    width: 250,
  },
  row: {
    marginBottom: 10,
  },
});

export default AuthenticationSignInScreen;
