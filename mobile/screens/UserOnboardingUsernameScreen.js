import React, {
  useState,
  useContext,
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

import UpdateUserProfileUsername from '~/mutations/UpdateUserProfileUsername';
import ScreenHeader from '~/components/ScreenHeader';
import DisplayHeading from '~/components/DisplayHeading';
import Button from '~/components/Button';
import { UserContext } from '~/contexts/UserContext';
import {
  COUNT_USER_ONBOARDING_REQUIRED_PAGES,
  RED,
  IS_IOS,
} from '~/constants';
import UserProfileUsernameInputContainer from '~/containers/UserProfileUsernameInputContainer';

function UserOnboardingUsernameScreen({ navigation }) {
  const { user } = useContext(UserContext);
  const [username, setUsername] = useState(user.profile.username || '');
  const [isDisabled, setIsDisabled] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [
    updateUsernameResult,
    updateUsername,
  ] = useMutation(UpdateUserProfileUsername);

  const handleUsernameChange = ({
    username,
    isDisabled,
    isFetching,
  }) => {
    setUsername(username);
    setIsDisabled(isDisabled);
    setIsFetching(isFetching);
  }

  const handleSubmit = () => {
    if (user.profile.username === username) {
      return navigation.navigate('UserOnboardingDateOfBirth');
    }

    updateUsername({
      uuid: user.profile.uuid,
      username,
    }).then(() => {
      navigation.navigate('UserOnboardingDateOfBirth');
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
          countPages={COUNT_USER_ONBOARDING_REQUIRED_PAGES}
          rightElement={<></>}
        />
        <View style={styles.container}>
          <DisplayHeading style={styles.heading}>
            Enter a username.
          </DisplayHeading>
          <UserProfileUsernameInputContainer
            onChange={handleUsernameChange}
          />
        </View>
        <View style={styles.footer}>
          <Button
            label="Next"
            isDisabled={isDisabled}
            isFetching={isFetching || updateUsernameResult.fetching}
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
    paddingRight: 20,
    paddingLeft: 20,
  },
  heading: {
    marginBottom: 20,
  },
  footer: {
    paddingRight: 20,
    paddingLeft: 20,
  },
});

export default UserOnboardingUsernameScreen;
