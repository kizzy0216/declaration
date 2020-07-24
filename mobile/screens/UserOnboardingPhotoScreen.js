import React, { useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ScreenHeader from '~/components/ScreenHeader';
import DisplayHeading from '~/components/DisplayHeading';
import Button from '~/components/Button';
import TextInput from '~/components/TextInput';
import {
  COUNT_USER_ONBOARDING_OPTIONAL_PAGES,
  GRAY,
} from '~/constants';

function UserOnboardingPhotoScreen({ navigation }) {
  return (
    <SafeAreaView
      style={styles.safeArea}
      contentContainerStyle={styles.contentContainer}
    >
      <ScreenHeader
        activePageIndex={0}
        countPages={COUNT_USER_ONBOARDING_OPTIONAL_PAGES}
        rightElement={<></>}
      />
      <View style={styles.container}>
        <DisplayHeading style={styles.heading}>
          Add your profile photo
        </DisplayHeading>
        <Text style={styles.subHeading}>
          Profiles with photos get 14x the engagement.
        </Text>
        <TextInput
          placeholder="Photo"
        />
      </View>
      <View style={styles.footer}>
        <View style={[styles.buttonWrapper, styles.skipButton]}>
          <Button
            label="Skip"
            theme="secondary"
            onPress={() => navigation.navigate('UserOnboardingLocation')}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            label="Next"
            onPress={() => navigation.navigate('UserOnboardingLocation')}
          />
        </View>
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
    paddingTop: 100,
    paddingRight: 20,
    paddingLeft: 20,
  },
  heading: {
    marginBottom: 20,
  },
  subHeading: {
    fontSize: 14,
    lineHeight: 24,
    marginBottom: 5,
    color: GRAY,
  },
  footer: {
    paddingRight: 10,
    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonWrapper: {
    flexBasis: '50%',
    paddingRight: 10,
    paddingLeft: 10,
  },
});

export default UserOnboardingPhotoScreen;
