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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMutation } from 'urql';

import InsertUserProfilePrivate from '~/mutations/InsertUserProfilePrivate';
import UpdateUserProfilePrivateDateOfBirth from '~/mutations/UpdateUserProfilePrivateDateOfBirth';
import ScreenHeader from '~/components/ScreenHeader';
import DisplayHeading from '~/components/DisplayHeading';
import Button from '~/components/Button';
import DateTimePicker from '~/components/DateTimePicker';
import { UserContext } from '~/contexts/UserContext';
import {
  COUNT_USER_ONBOARDING_REQUIRED_PAGES,
  GRAY,
} from '~/constants';
import isValidDateOfBirth from 'Shared/utils/isValidDateOfBirth';

function UserOnboardingDateOfBirthScreen({ navigation }) {
  const { user, refresh: refreshUser } = useContext(UserContext);
  const [dateOfBirth, setDateOfBirth] = useState(
    user.profile.private.dateOfBirth
      ? new Date(user.profile.private.dateOfBirth)
      : null
  );
  const [hasSettled, setHasSettled] = useState(false);
  const [
    insertProfilePrivateResult,
    insertProfilePrivate,
  ] = useMutation(InsertUserProfilePrivate);
  const [
    updateDateOfBirthResult,
    updateDateOfBirth,
  ] = useMutation(UpdateUserProfilePrivateDateOfBirth);

  // ensure User has private profile in database
  // TODO should probably move to some kind of webhook
  useEffect(() => {
    if (!user.profile.private.uuid && user.profile.uuid) {
      insertProfilePrivate({
        user_profile_uuid: user.profile.uuid,
      }).then(() => {
        refreshUser();
      });

      setHasSettled(true);
    }
  }, [user.profile.private]);

  useEffect(() => {
    refreshUser();
  }, []);

  const {
    isValid,
    error,
  } = isValidDateOfBirth(dateOfBirth);

  const handleSubmit = () => {
    if (user.profile.private.dateOfBirth === dateOfBirth) {
      return navigation.navigate('UserOnboardingGender');
    }

    updateDateOfBirth({
      uuid: user.profile.private.uuid,
      date_of_birth: dateOfBirth,
    }).then(() => {
      navigation.navigate('UserOnboardingGender');
    });
  }

  return (
    <SafeAreaView
      style={styles.safeArea}
      contentContainerStyle={styles.contentContainer}
    >
      <ScreenHeader
        activePageIndex={2}
        countPages={COUNT_USER_ONBOARDING_REQUIRED_PAGES}
        rightElement={<></>}
      />
      <View style={styles.container}>
        <DisplayHeading style={styles.heading}>
          What's your date of birth?
        </DisplayHeading>
        <Text style={styles.subHeading}>
          This information will not be publicly available to other members.
        </Text>
        <DateTimePicker
          mode="date"
          placeholder="Month / Date / Year"
          error={error}
          value={dateOfBirth}
          onChange={setDateOfBirth}
        />
      </View>
      <View style={styles.footer}>
        <Button
          label="Next"
          isDisabled={(!hasSettled && insertProfilePrivate.fetching) || !user.profile.private.uuid || !isValid}
          isFetching={insertProfilePrivate.fetching || updateDateOfBirthResult.fetching}
          onPress={handleSubmit}
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
    paddingTop: 100,
    paddingRight: 20,
    paddingLeft: 20,
  },
  heading: {
    width: 300,
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

export default UserOnboardingDateOfBirthScreen;
