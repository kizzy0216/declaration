import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '~/components/Button';

function AuthenticationHomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={require('~/assets/images/authentication-home-background.jpg')}
      style={styles.imageBackground}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.logoWrapper}>
            <Image
              source={require('~/shared/images/logo-white.png')}
              style={styles.logo}
            />
          </View>
          <Text style={styles.subHeading}>
            Private networking made easy
          </Text>
        </View>
        <View style={styles.footer}>
          <Button
            label="Sign In"
            theme="primary"
            onPress={() => navigation.navigate('AuthenticationSignIn')}
          />
          <Button
            label="Create Your Own Network"
            theme="transparent"
            onPress={() => navigation.navigate('NetworkAccessRequest')}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    paddingTop: 150,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrapper: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  logo: {
    flex: 1,
    width: null,
    height: null,
    aspectRatio: 298/28,
    resizeMode: 'contain',
  },
  subHeading: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'column',
    paddingBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 20,
    paddingLeft: 20,
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

export default AuthenticationHomeScreen;
