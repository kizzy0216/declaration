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
}) {
  if (!availabilityListing) {
    return null;
  }

  return (
    <View style={styles.availabilityListing}>
      <View style={styles.container}>
        <View style={styles.avatarWrapper}>
          <Avatar
            name={creator.name}
            imageSrc={creator.profile.photo}
          />
        </View>

        <Text style={styles.heading}>
          {heading}
        </Text>

        <Text style={styles.body}>
          {body}
        </Text>

        {availabilityListing.criteria &&
          <View style={styles.criteria}>
            {availabilityListing.criteria.map((criterion) => (
              <Text style={styles.criterion}>
                {'\u2022 '}
                {criterion.text}
              </Text>
            ))}
          </View>
        }

        {availabilityListing.callToAction &&
          <View style={styles.callToAction}>
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
  avatarWrapper: {
    marginBottom: 20,
  },
  heading: {
    marginBottom: 20,
    fontSize: 24,
    lineHeight: 28,
    fontWeight: '600',
  },
  body: {
    marginBottom: 20,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '600',
  },
  criteria: {
    marginBottom: 20,
  },
  criterion: {
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 5,
  },
  callToAction: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    maxWidth: 200,
  },
});

export default ContentTileForegroundAvailabilityListing;
