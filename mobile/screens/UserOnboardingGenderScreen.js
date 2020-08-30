import React, {
  useContext,
  useState,
} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMutation } from 'urql';

import UpdateUserProfilePrivateGender from '~/mutations/UpdateUserProfilePrivateGender';
import OnboardingHeader from '~/components/OnboardingHeader';
import GenderInput from '~/components/GenderInput';
import DisplayHeading from '~/components/DisplayHeading';
import Button from '~/components/Button';
import { UserContext } from '~/contexts/UserContext';
import {
  COUNT_USER_ONBOARDING_REQUIRED_PAGES,
  GRAY,
  IS_IOS,
} from '~/constants';

function UserOnboardingGenderScreen({ navigation }) {
  const { user } = useContext(UserContext);
  const [gender, setGender] = useState(user.profile.private.gender || '');
  const [
    updateGenderResult,
    updateGender,
  ] = useMutation(UpdateUserProfilePrivateGender);

  const isValid = gender.length > 0;

  const handleSubmit = () => {
    if (user.profile.private.gender === gender) {
      return navigation.navigate('UserOnboardingProfileWelcome');
    }

    updateGender({
      uuid: user.profile.private.uuid,
      gender,
    }).then(() => {
      navigation.navigate('UserOnboardingProfileWelcome');
    });
  }

  return (
    <KeyboardAvoidingView
      behavior={IS_IOS ? 'padding': 'height'}
      style={{ flex: 1 }}
    >
      <SafeAreaView
        style={styles.safeArea}
        contentContainerStyle={styles.contentContainer}
      >
        <OnboardingHeader
          activePageIndex={3}
          countPages={COUNT_USER_ONBOARDING_REQUIRED_PAGES}
          navigation={navigation}
        />
        <View style={styles.container}>
          <DisplayHeading style={styles.heading}>
            What's your gender?
          </DisplayHeading>
          <Text style={styles.subHeading}>
            This information will not be publicly visible, but may be used by
            members seeking gendered support or advice.
          </Text>
          <GenderInput
            gender={gender}
            setGender={setGender}
          />
        </View>
        <View style={styles.footer}>
          <Button
            label="Next"
            isDisabled={!isValid}
            isFetching={updateGenderResult.fetching}
            onPress={handleSubmit}
          />
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
    paddingRight: 30,
    paddingLeft: 30,
  },
  heading: {
    marginBottom: 50,
  },
  subHeading: {
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 50,
  },
  footer: {
    paddingRight: 30,
    paddingLeft: 30,
  },
});

export default UserOnboardingGenderScreen;
