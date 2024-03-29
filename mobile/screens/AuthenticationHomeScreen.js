import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { State, LongPressGestureHandler } from 'react-native-gesture-handler';
import Logo from '@shared/components/Logo';
import VideoBackground from '~/components/VideoBackground';
import Button from '~/components/Button';
import { version } from '../package.json';

function AuthenticationHomeScreen({ navigation }) {
  return (
    <VideoBackground
      source={require('~/shared/videos/home-background.mp4')}
      posterSource={require('~/shared/images/home-background.jpg')}
      withGradient={true}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
         <LongPressGestureHandler
            onHandlerStateChange={({ nativeEvent }) => {
              if (nativeEvent.state === State.ACTIVE) {
                alert('Version: ' + version)
              }
            }}
            minDurationMs={2000}
          >
            <View style={styles.logoWrapper}>
              <Logo
                width={171}
                height={16}
                fill="white"
              />
            </View>
          </LongPressGestureHandler>
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
    fontFamily: 'Orpheus',
    marginBottom: 25,
  },
  subHeading: {
    color: 'white',
    fontSize: 18,
    lineHeight: 28,
    textAlign: 'center',
    marginBottom: 50,
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
