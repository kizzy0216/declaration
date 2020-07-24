import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMutation } from 'urql';

import { UserContext } from '~/contexts/UserContext';
import DisplayHeading from '~/components/DisplayHeading';
import Button from '~/components/Button';
import InsertUserProfile from '~/mutations/InsertUserProfile';

function UserOnboardingUsernameScreen({ navigation }) {
  const [hasSettled, setHasSettled] = useState(false);
  const {
    user,
    refresh: refreshUser,
    hasProfile,
  } = useContext(UserContext);
  const [
    insertProfileResult,
    insertProfile,
  ] = useMutation(InsertUserProfile);

  // ensure User has profile in database
  // TODO should probably move to some kind of webhook
  useEffect(() => {
    if (!user.profile.uuid && user.uuid) {
      insertProfile({
        user_uuid: user.uuid,
      }).then(() => {
        refreshUser();
      });

      setHasSettled(true);
    }
  }, [user.profile]);

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <SafeAreaView
      style={styles.safeArea}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.container}>
        <DisplayHeading style={styles.heading}>
          Welcome to Declaration.
        </DisplayHeading>
        <Text style={styles.paragraph}>
          Declaration is an invite only private networking platform that
          removes the work from networking.
        </Text>
        <Text style={styles.paragraph}>
          A trusted space where wisdom is shared, questions are answered, and
          deeper relationships are created.
        </Text>
      </View>
      <View style={styles.footer}>
        <Button
          label="Register"
          isDisabled={(!hasSettled && insertProfile.fetching) || !user.profile.uuid}
          isFetching={insertProfile.fetching}
          onPress={() => navigation.navigate('UserOnboardingName')}
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
    paddingTop: 20,
    paddingRight: 20,
    paddingLeft: 20,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  heading: {
    width: 200,
    marginBottom: 40,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    width: 300,
  },
  footer: {
    paddingRight: 20,
    paddingLeft: 20,
  },
});

export default UserOnboardingUsernameScreen;
