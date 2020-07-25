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

import UpdateUserProfileEducationalInstitution from '~/mutations/UpdateUserProfileEducationalInstitution';
import UserOnboardingFooter from '~/components/UserOnboardingFooter';
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

function UserOnboardingEducationalInstitutionScreen({ navigation }) {
  const { user } = useContext(UserContext);
  const [educationalInstitution, setEducationalInstitution] = useState(user.profile.educationalInstitution || '');
  const [
    updateEducationalInstitutionResult,
    updateEducationalInstitution,
  ] = useMutation(UpdateUserProfileEducationalInstitution);

  const handleSubmit = () => {
    if (user.profile.educationalInstitution === educationalInstitution) {
      return navigation.navigate('UserOnboardingWorkPlace');
    }

    updateEducationalInstitution({
      uuid: user.profile.uuid,
      educational_institution: educationalInstitution,
    }).then(() => {
      navigation.navigate('UserOnboardingWorkPlace');
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
          activePageIndex={2}
          countPages={COUNT_USER_ONBOARDING_OPTIONAL_PAGES}
          rightElement={<></>}
        />
        <View style={styles.container}>
          <DisplayHeading style={styles.heading}>
            Where did you go to school?
          </DisplayHeading>
          <Text style={styles.subHeading}>
            Enter your school name so that we can connect you with your alumni.
            Optional.
          </Text>
          <TextInput
            placeholder="Educational institution"
            value={educationalInstitution}
            onChange={setEducationalInstitution}
          />
        </View>
        <UserOnboardingFooter
          isFetching={updateEducationalInstitutionResult.fetching}
          onSkip={() => navigation.navigate('UserOnboardingWorkPlace')}
          onNext={handleSubmit}
        />
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
});

export default UserOnboardingEducationalInstitutionScreen;