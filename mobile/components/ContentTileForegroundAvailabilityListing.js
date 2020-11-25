import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import * as Linking from 'expo-linking';

import Avatar from '~/components/Avatar';
import Button from '~/components/Button';

function ContentTileForegroundAvailabilityListing({
  creator,
  heading,
  body,
  availabilityListing,
  hasMedia = false,
}) {
  const theme = (
    hasMedia ? 'light' : 'dark'
  );

  if (!availabilityListing) {
    return null;
  }

  return (
    <View
      style={styles.availabilityListing}
      pointerEvents="box-none"
    >
      <View
        style={styles.container}
        pointerEvents="box-none"
      >
        <View
          style={styles.avatarWrapper}
          pointerEvents="box-none"
        >
          <Avatar
            name={creator.name}
            imageSrc={creator.profile.photo}
          />
        </View>

        <Text
          style={[
            styles.heading,
            styles[theme],
          ]}
          numberOfLines={2}
        >
          {heading}
        </Text>

        <View
          style={[
            styles.horizontalSeperator,
            styles[`${theme}Background`],
          ]}
        />

        <Text
          style={[
            styles.body,
            styles[theme],
          ]}
          numberOfLines={4}
        >
          {body}
        </Text>

        <View
          style={[
            styles.horizontalSeperator,
            styles[`${theme}Background`],
          ]}
        />

        {availabilityListing.credentials &&
          <View
            style={styles.credentials}
            pointerEvents="box-none"
          >
            {availabilityListing.credentials.map((credential, index) => (
              <Text
                key={index}
                style={[
                  styles.credential,
                  styles[theme],
                ]}
                numberOfLines={2}
              >
                {'\u2022 '}
                {credential.text}
              </Text>
            ))}
          </View>
        }

        {availabilityListing.callToAction &&
          <View
            style={styles.callToAction}
            pointerEvents="box-none"
          >
            <Button
              label="Contact me"
              theme="tertiary"
              size="small"
              onPress={() => Linking.openURL(availabilityListing.callToAction.href)}
            />
          </View>
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  },
  avatarWrapper: {
    marginBottom: 20,
  },
  heading: {
    marginBottom: 20,
    fontSize: 24,
    lineHeight: 28,
    fontWeight: '600',
  },
  horizontalSeperator: {
    height: 2,
    width: '100%',
    marginBottom: 20,
  },
  body: {
    marginBottom: 20,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '600',
  },
  credentials: {
    marginBottom: 20,
  },
  credential: {
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 5,
  },
  callToAction: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    maxWidth: 200,
  },
  light: {
    color: 'white',
  },
  lightBackground: {
    backgroundColor: 'white',
  },
  dark: {
    color: 'black',
  },
  darkBackground: {
    backgroundColor: 'black',
  },
});

export default ContentTileForegroundAvailabilityListing;
