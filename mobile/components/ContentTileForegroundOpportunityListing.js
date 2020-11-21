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
    <View
      style={styles.opportunityListing}
      pointerEvents="box-none"
    >
      <View
        style={styles.container}
        pointerEvents="box-none"
      >
        {opportunityListing.company &&
          <View
            style={styles.company}
            pointerEvents="box-none"
          >
            <View
              style={styles.avatarWrapper}
              pointerEvents="box-none"
            >
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
          numberOfLines={2}
        >
          {heading}
        </Text>

        <Text
          style={[
            styles.subHeading,
            styles[theme],
          ]}
          numberOfLines={2}
        >
          {subHeading}
        </Text>

        {opportunityListing.criteria &&
          <View
            style={styles.criteria}
            pointerEvents="box-none"
          >
            {opportunityListing.criteria.map((criterion, index) => (
              <Text
                key={index}
                style={[
                  styles.criterion,
                  styles[theme],
                ]}
                numberOfLines={1}
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
          <View
            style={styles.callToAction}
            pointerEvents="box-none"
          >
            <Button
              label={opportunityListing.callToAction.label}
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
    lineHeight: 20,
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
