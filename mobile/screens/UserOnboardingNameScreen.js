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

import UpdateUserName from '~/mutations/UpdateUserName';
import OnboardingHeader from '~/components/OnboardingHeader';
import DisplayHeading from '~/components/DisplayHeading';
import Button from '~/components/Button';
import TextInput from '~/components/TextInput';
import {
  COUNT_USER_ONBOARDING_REQUIRED_PAGES,
  IS_IOS,
} from '~/constants';
import { UserContext } from '~/contexts/UserContext';

function UserOnboardingNameScreen({ navigation }) {
  const { user } = useContext(UserContext);
  const [name, setName] = useState(user.name || '');
  const [
    updateNameResult,
    updateName,
  ] = useMutation(UpdateUserName);

  const isDisabled = (name.length === 0);

  const handleSubmit = () => {
    if (user.name === name) {
      return navigation.navigate('UserOnboardingUsername');
    }

    updateName({
      uuid: user.uuid,
      name,
    }).then(() => {
      navigation.navigate('UserOnboardingUsername');
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
        navigation={navigation}
      >
        <OnboardingHeader
          activePageIndex={0}
          countPages={COUNT_USER_ONBOARDING_REQUIRED_PAGES}
        />
        <View style={styles.container}>
          <DisplayHeading style={styles.heading}>
            What's your name?
          </DisplayHeading>
          <TextInput
            placeholder="Full name"
            value={name}
            onChange={setName}
            autoCapitalize="words"
          />
        </View>
        <View style={styles.footer}>
          <Button
            label="Next"
            isDisabled={isDisabled}
            isFetching={updateNameResult.fetching}
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
  footer: {
    paddingRight: 30,
    paddingLeft: 30,
  },
});

export default UserOnboardingNameScreen;
