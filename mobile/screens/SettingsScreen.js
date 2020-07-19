import React, { useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
} from 'react-native';
import * as Linking from 'expo-linking';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackActions } from '@react-navigation/native';

import ScreenHeader from '~/components/ScreenHeader';
import Button from '~/components/Button';
import { UserContext } from '~/contexts/UserContext';
import ArrowRightIcon from 'Shared/components/icons/ArrowRightIcon';
import LogOutIcon from 'Shared/components/icons/LogOutIcon';
import EmailSendIcon from 'Shared/components/icons/EmailSendIcon';

function SettingsScreen({ navigation }) {
  const { logOut } = useContext(UserContext);

  function handleLogOut() {
    logOut();

    navigation.dispatch(
      StackActions.replace('AuthenticationRoot')
    );
  }

  return (
    <SafeAreaView>
      <ScreenHeader
        heading="Settings"
        onClose={() => navigation.goBack()}
      />
      <ScrollView style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.heading}>
            Account
          </Text>
          <View style={styles.buttonWrapper}>
            <Button
              label="Account information"
              theme="secondary"
              onPress={() => {}}
              rightIcon={(
                <ArrowRightIcon
                  width={24}
                  height={24}
                  fill="black"
                />
              )}
            />
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              label="Edit your profile"
              theme="secondary"
              onPress={() => {}}
              rightIcon={(
                <ArrowRightIcon
                  width={24}
                  height={24}
                  fill="black"
                />
              )}
            />
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              label="Log out"
              theme="secondary"
              onPress={handleLogOut}
              rightIcon={(
                <LogOutIcon
                  width={24}
                  height={24}
                  fill="black"
                />
              )}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>
            Support
          </Text>
          <View style={styles.buttonWrapper}>
            <Button
              label="Report spam or abuse"
              theme="secondary"
              onPress={() => Linking.openURL('mailto:abuse@declaration.net')}
              rightIcon={(
                <EmailSendIcon
                  width={24}
                  height={24}
                  fill="black"
                />
              )}
            />
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              label="Something isn't working"
              theme="secondary"
              onPress={() => Linking.openURL('mailto:help@declaration.net')}
              rightIcon={(
                <EmailSendIcon
                  width={24}
                  height={24}
                  fill="black"
                />
              )}
            />
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              label="General feedback"
              theme="secondary"
              onPress={() => Linking.openURL('hi:help@declaration.net')}
              rightIcon={(
                <EmailSendIcon
                  width={24}
                  height={24}
                  fill="black"
                />
              )}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>
            About
          </Text>
          <View style={styles.buttonWrapper}>
            <Button
              label="Contact us"
              theme="secondary"
              onPress={() => navigation.navigate('ContactUs')}
              rightIcon={(
                <ArrowRightIcon
                  width={24}
                  height={24}
                  fill="black"
                />
              )}
            />
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              label="Partnerships"
              theme="secondary"
              onPress={() => navigation.navigate('Partnerships')}
              rightIcon={(
                <ArrowRightIcon
                  width={24}
                  height={24}
                  fill="black"
                />
              )}
            />
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              label="Privacy policy"
              theme="secondary"
              onPress={() => navigation.navigate('PrivacyPolicy')}
              rightIcon={(
                <ArrowRightIcon
                  width={24}
                  height={24}
                  fill="black"
                />
              )}
            />
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              label="Terms of use"
              theme="secondary"
              onPress={() => navigation.navigate('TermsOfUse')}
              rightIcon={(
                <ArrowRightIcon
                  width={24}
                  height={24}
                  fill="black"
                />
              )}
            />
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              label="Copyright"
              theme="secondary"
              onPress={() => navigation.navigate('Copyright')}
              rightIcon={(
                <ArrowRightIcon
                  width={24}
                  height={24}
                  fill="black"
                />
              )}
            />
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              label="Community guidelines"
              theme="secondary"
              onPress={() => navigation.navigate('CommunityGuidelines')}
              rightIcon={(
                <ArrowRightIcon
                  width={24}
                  height={24}
                  fill="black"
                />
              )}
            />
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingRight: 20,
    paddingLeft: 20,
  },
  section: {
    marginBottom: 50,
  },
  heading: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonWrapper: {
    marginBottom: 10,
  },
});

export default SettingsScreen;
