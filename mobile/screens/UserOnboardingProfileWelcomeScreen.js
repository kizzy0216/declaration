import React, { useContext, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { setStatusBarStyle } from 'expo-status-bar';
import { useFocusEffect } from '@react-navigation/native';

import DisplayHeading from '~/components/DisplayHeading';
import Button from '~/components/Button';
import KenBurnsImage from '~/components/KenBurnsImage';

function UserOnboardingProfileWelcomeScreen({ navigation }) {
  useFocusEffect(useCallback(() => {
    setStatusBarStyle('light');
    return () => {
      setStatusBarStyle('dark');
    }
  }));

  return (
    <View style={styles.screen}>
      <KenBurnsImage
        source={require('~/assets/images/user-onboarding-profile-welcome-background.png')}
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
            Your Profile
          </DisplayHeading>
          <Text style={styles.paragraph}>
            Your profile photo is your first chance to make a good impression.
          </Text>
          <Text style={styles.paragraph}>
            Also, completing your profile means you’re 14 times more likely to
            be viewed by other members.
          </Text>
        </View>

        <View style={styles.footer}>
          <Button
            label="Next"
            onPress={() => navigation.navigate('UserOnboardingPhoto')}
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

export default UserOnboardingProfileWelcomeScreen;
