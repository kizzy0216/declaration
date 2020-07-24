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

import UpdateUserProfileWorkTitle from '~/mutations/UpdateUserProfileWorkTitle';
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

function UserOnboardingWorkTitleScreen({ navigation }) {
  const { user } = useContext(UserContext);
  const [workTitle, setWorkTitle] = useState(user.profile.workTitle || '');
  const [
    updateWorkTitleResult,
    updateWorkTitle,
  ] = useMutation(UpdateUserProfileWorkTitle);

  const handleSubmit = () => {
    if (user.profile.workTitle === workTitle) {
      return navigation.navigate('UserOnboardingWorkBio');
    }

    updateWorkTitle({
      uuid: user.profile.uuid,
      work_title: workTitle,
    }).then(() => {
      navigation.navigate('UserOnboardingWorkBio');
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
          activePageIndex={5}
          countPages={COUNT_USER_ONBOARDING_OPTIONAL_PAGES}
          rightElement={<></>}
        />
        <View style={styles.container}>
          <DisplayHeading style={styles.heading}>
            What's your title?
          </DisplayHeading>
          <Text style={styles.subHeading}>
            Enter your official title at your workplace to let members know what
            your work generally looks like. Optional.
          </Text>
          <TextInput
            placeholder="Designer, student, etc"
            value={workTitle}
            onChange={setWorkTitle}
          />
        </View>
        <View style={styles.footer}>
          <View style={[styles.buttonWrapper, styles.skipButton]}>
            <Button
              label="Skip"
              theme="transparent"
              onPress={() => navigation.navigate('UserOnboardingWorkBio')}
            />
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              label="Next"
              isFetching={updateWorkTitleResult.fetching}
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

export default UserOnboardingWorkTitleScreen;
