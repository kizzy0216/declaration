import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMutation } from 'urql';

import UpdateUserProfileLocation from '~/mutations/UpdateUserProfileLocation';
import ScreenHeader from '~/components/ScreenHeader';
import DisplayHeading from '~/components/DisplayHeading';
import Button from '~/components/Button';
import TextInput from '~/components/TextInput';
import {
  COUNT_USER_ONBOARDING_OPTIONAL_PAGES,
  GRAY,
  IS_IOS,
} from '~/constants';
import { UserContext } from '~/contexts/UserContext';

function UserOnboardingLocationScreen({ navigation }) {
  const { user } = useContext(UserContext);
  const [location, setLocation] = useState(user.profile.location || '');
  const [
    updateLocationResult,
    updateLocation,
  ] = useMutation(UpdateUserProfileLocation);

  const handleSubmit = () => {
    updateLocation({
      uuid: user.profile.uuid,
      location,
    }).then(() => {
      navigation.navigate('UserOnboardingPersonalBio');
    });
  }

  return (
    <KeyboardAvoidingView
      behavior={IS_IOS ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <SafeAreaView
        style={styles.safeArea}
        contentContainerStyle={styles.contentContainer}
      >
        <ScreenHeader
          activePageIndex={1}
          countPages={COUNT_USER_ONBOARDING_OPTIONAL_PAGES}
          rightElement={<></>}
        />
        <View style={styles.container}>
          <DisplayHeading style={styles.heading}>
            Where do you live currently?
          </DisplayHeading>
          <Text style={styles.subHeading}>
            Your rough location may be used by members seeking support by
            those geographically close to them. Optional.
          </Text>
          <TextInput
            placeholder="City, State"
            value={location}
            onChange={setLocation}
            autoCapitalize="words"
          />
        </View>
        <View style={styles.footer}>
          <View style={[styles.buttonWrapper, styles.skipButton]}>
            <Button
              label="Skip"
              theme="secondary"
              onPress={() => navigation.navigate('UserOnboardingEducationalInstitution')}
            />
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              label="Next"
              isFetching={updateLocationResult.fetching}
              onPress={handleSubmit}
            />
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
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

export default UserOnboardingLocationScreen;
