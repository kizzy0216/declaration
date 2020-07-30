import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMutation } from 'urql';
import { LinearGradient } from 'expo-linear-gradient';
import { setStatusBarStyle } from 'expo-status-bar';
import { useFocusEffect } from '@react-navigation/native';

import KenBurnsImage from '~/components/KenBurnsImage';
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

  useFocusEffect(useCallback(() => {
    setStatusBarStyle('light');
    return () => {
      setStatusBarStyle('dark');
    }
  }));

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
    <View style={styles.screen}>
      <KenBurnsImage
        source={require('~/assets/images/user-onboarding-welcome-background.png')}
        style={styles.background}
        imageStyle={styles.backgroundImage}
      />
      <LinearGradient
        colors={['rgba(0,0,0,0)','rgba(0,0,0,0.7)']}
        style={styles.gradient}
      />

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
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    position: 'relative',
  },
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
    flexDirection: 'column',
    justifyContent: 'center',
    paddingRight: 30,
    paddingLeft: 30,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    position: 'relative',
    left: '-50%',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  heading: {
    width: 300,
    marginBottom: 40,
    color: 'white',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 30,
    width: 300,
    color: 'white',
  },
  footer: {
    paddingRight: 30,
    paddingLeft: 30,
  },
});

export default UserOnboardingUsernameScreen;
