import React, { useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import DisplayHeading from '~/components/DisplayHeading';
import Button from '~/components/Button';

function UserOnboardingProfileWelcomeScreen({ navigation }) {
  return (
    <SafeAreaView
      style={styles.safeArea}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.container}>
        <DisplayHeading style={styles.heading}>
          Your Profile
        </DisplayHeading>
        <Text style={styles.paragraph}>
          Your profile photo is your first chance to make a good impression.
        </Text>
        <Text style={styles.paragraph}>
          Also, completing your profile means you’re 14 times more likely to
          be viewed by other members.
        </Text>
      </View>
      <View style={styles.footer}>
        <Button
          label="Next"
          onPress={() => navigation.navigate('UserOnboardingPhoto')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    paddingTop: 20,
    paddingRight: 20,
    paddingLeft: 20,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  heading: {
    marginBottom: 40,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    width: 300,
  },
  footer: {
    paddingRight: 20,
    paddingLeft: 20,
  },
});

export default UserOnboardingProfileWelcomeScreen;
