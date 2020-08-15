import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import * as Linking from 'expo-linking';

import Avatar from '~/components/Avatar';
import Button from '~/components/Button';
import CheckmarkIcon from '@shared/components/icons/CheckmarkIcon';

function ContentTileForegroundOpportunityListing({
  heading,
  subHeading,
  opportunityListing,
  hasMedia,
}) {
  const theme = (
    hasMedia ? 'light' : 'dark'
  );

  if (!opportunityListing) {
    return null;
  }

  return (
    <View style={styles.opportunityListing}>
      <View style={styles.container}>
        {opportunityListing.company &&
          <View style={styles.company}>
            <View style={styles.avatarWrapper}>
              <Avatar
                theme="secondary"
                name={opportunityListing.company.name}
                imageSrc={opportunityListing.company.photo}
              />
            </View>
            <Text
              style={[
                styles.companyName,
                styles[theme],
              ]}
            >
              {opportunityListing.company.name}
            </Text>
          </View>
        }

        <Text
          style={[
            styles.heading,
            styles[theme],
          ]}
        >
          {heading}
        </Text>

        <Text
          style={[
            styles.subHeading,
            styles[theme],
          ]}
        >
          {subHeading}
        </Text>

        {opportunityListing.criteria &&
          <View style={styles.criteria}>
            {opportunityListing.criteria.map((criterion, index) => (
              <Text
                key={index}
                style={[
                  styles.criterion,
                  styles[theme],
                ]}
              >
                <CheckmarkIcon
                  fill={theme === 'light' ? 'white' : 'black'}
                />
                &nbsp;
                {criterion.text}
              </Text>
            ))}
          </View>
        }

        {opportunityListing.callToAction &&
          <View style={styles.callToAction}>
            <Button
              label="Apply now"
              theme="tertiary"
              size="small"
              onPress={() => Linking.openURL(opportunityListing.callToAction.href)}
            />
          </View>
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  company: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarWrapper: {
    marginRight: 10,
  },
  companyName: {
    fontWeight: '600',
  },
  heading: {
    marginBottom: 10,
    fontSize: 70,
    lineHeight: 70,
    fontWeight: '600',
  },
  subHeading: {
    marginBottom: 20,
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '600',
  },
  criteria: {
    marginBottom: 20,
  },
  criterion: {
    fontSize: 16,
    lineHeight: 28,
    marginBottom: 10,
  },
  callToAction: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    maxWidth: 200,
  },
  light: {
    color: 'white',
  },
  dark: {
    color: 'black',
  },
});

export default ContentTileForegroundOpportunityListing;
