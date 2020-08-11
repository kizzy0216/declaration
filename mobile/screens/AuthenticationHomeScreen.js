import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Logo from '@shared/components/Logo';
import VideoBackground from '~/components/VideoBackground';
import Button from '~/components/Button';

function AuthenticationHomeScreen({ navigation }) {
  return (
    <VideoBackground
      source={require('~/shared/videos/home-background.mp4')}
      posterSource={require('~/shared/images/home-background.jpg')}
      withGradient={true}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.logoWrapper}>
            <Logo
              width={161}
              height={15}
              fill="white"
            />
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.heading}>
            Built for those{'\n'}
            who dare to be great
          </Text>
          <Text style={styles.subHeading}>
            A private social advising network designed to create positive
            social impact.
          </Text>
          <Button
            label="Log In"
            theme="primary"
            onPress={() => navigation.navigate('AuthenticationLogIn', { email: null, code: null })}
            style={{
              width: '100%',
              marginBottom: 40,
            }}
          />
          <Button
            label="Create Your Own Network"
            theme="transparent"
            onPress={() => navigation.navigate('NetworkAccessRequest')}
            labelStyle={{
              color: 'white',
              textDecorationLine: 'underline',
            }}
          />
        </View>
      </SafeAreaView>
    </VideoBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    paddingTop: 20,
    paddingLeft: 30,
    paddingRight: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrapper: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  heading: {
    color: 'white',
    fontSize: 40,
    textAlign: 'center',
    fontFamily: 'Requiem-Display',
    marginBottom: 10,
  },
  subHeading: {
    color: 'white',
    fontSize: 18,
    lineHeight: 28,
    textAlign: 'center',
    marginBottom: 30,
  },
  footer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 30,
    paddingBottom: 20,
    paddingLeft: 30,
  },
});

export default AuthenticationHomeScreen;
