import React, {
  useState,
  useContext,
  useEffect,
} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMutation, useQuery } from 'urql';

import GetUsersWithUsername from '~/queries/GetUsersWithUsername';
import UpdateUserProfileUsername from '~/mutations/UpdateUserProfileUsername';
import ScreenHeader from '~/components/ScreenHeader';
import DisplayHeading from '~/components/DisplayHeading';
import Button from '~/components/Button';
import TextInput from '~/components/TextInput';
import { UserContext } from '~/contexts/UserContext';
import {
  COUNT_USER_ONBOARDING_REQUIRED_PAGES,
  GRAY,
  RED,
  IS_IOS,
} from '~/constants';
import isValidUsername from 'Shared/utils/isValidUsername';
import useDebouncedState from 'Shared/hooks/useDebouncedState';

function UserOnboardingUsernameScreen({ navigation }) {
  const { user } = useContext(UserContext);
  const [username, setUsername] = useState(user.profile.username || '');
  const debouncedUsername = useDebouncedState(username, 300);
  const [
    getUsersWithUsernameResult,
    getUsersWithUsername,
  ] = useQuery({
    query: GetUsersWithUsername,
    variables: {
      username: debouncedUsername,
    },
    pause: !debouncedUsername,
  });
  const [
    updateUsernameResult,
    updateUsername,
  ] = useMutation(UpdateUserProfileUsername);

  const { isValid, error: validationError } = isValidUsername(username);
  const isTaken = (
    !getUsersWithUsernameResult.fetching &&
    getUsersWithUsernameResult.data &&
    getUsersWithUsernameResult.data.user_profile &&
    getUsersWithUsernameResult.data.user_profile.length > 0 &&
    getUsersWithUsernameResult.data.user_profile[0].uuid !== user.profile.uuid
  );
  const isDisabled = (!isValid || isTaken);
  const takenError = (
    isTaken
      ? 'Username taken'
      : ''
  );

  useEffect(() => {
    getUsersWithUsername();
  }, [debouncedUsername]);

  const handleSubmit = () => {
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
          <Text style={styles.subHeading}>
            This is your unique handle across all networks, and what other
            members will @mention to get your feedback
          </Text>
          <TextInput
            placeholder="username"
            autoCorrect={false}
            autoCapitalize="none"
            maxLength={16}
            error={validationError || takenError}
            value={username}
            onChange={username => setUsername(username.toLowerCase())}
          />
        </View>
        <View style={styles.footer}>
          <Button
            label="Next"
            isDisabled={isDisabled}
            isFetching={getUsersWithUsernameResult.fetching || updateUsernameResult.fetching}
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
  subHeading: {
    fontSize: 14,
    lineHeight: 24,
    marginBottom: 5,
    color: GRAY,
  },
  footer: {
    paddingRight: 20,
    paddingLeft: 20,
  },
});

export default UserOnboardingUsernameScreen;
