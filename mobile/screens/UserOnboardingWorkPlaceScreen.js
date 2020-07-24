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

import UpdateUserProfileWorkPlace from '~/mutations/UpdateUserProfileWorkPlace';
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

function UserOnboardingWorkPlaceScreen({ navigation }) {
  const { user } = useContext(UserContext);
  const [workPlace, setWorkPlace] = useState(user.profile.workPlace || '');
  const [
    updateWorkPlaceResult,
    updateWorkPlace,
  ] = useMutation(UpdateUserProfileWorkPlace);

  const handleSubmit = () => {
    if (user.profile.workPlace === workPlace) {
      return navigation.navigate('UserOnboardingWorkTitle');
    }

    updateWorkPlace({
      uuid: user.profile.uuid,
      work_place: workPlace,
    }).then(() => {
      navigation.navigate('UserOnboardingWorkTitle');
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
        <ScreenHeader
          activePageIndex={3}
          countPages={COUNT_USER_ONBOARDING_OPTIONAL_PAGES}
          rightElement={<></>}
        />
        <View style={styles.container}>
          <DisplayHeading style={styles.heading}>
            Where do you work?
          </DisplayHeading>
          <Text style={styles.subHeading}>
            Put your work into context by providing your workplace.
            Optional.
          </Text>
          <TextInput
            placeholder="Company name"
            value={workPlace}
            onChange={setWorkPlace}
          />
        </View>
        <UserOnboardingFooter
          isFetching={updateWorkPlaceResult.fetching}
          onSkip={() => navigation.navigate('UserOnboardingWorkTitle')}
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

export default UserOnboardingWorkPlaceScreen;
