import React from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import { SafeAreaView  } from 'react-native-safe-area-context';

import ContentTileForegroundPoll from '~/components/ContentTileForegroundPoll';
import ContentTileForegroundAvailabilityListing from '~/components/ContentTileForegroundAvailabilityListing';
import ContentTileForegroundOpportunityListing from '~/components/ContentTileForegroundOpportunityListing';

function ContentTileForeground({
  heading,
  subHeading,
  body,
  poll,
  media,
  availabilityListing,
  opportunityListing,
  creator,
  onPollOptionSelect = () => {},
}) {
  if (
    !heading &&
    !poll &&
    !availabilityListing &&
    !opportunityListing
  ) {
    return null;
  }

  return (
    <SafeAreaView >
      <View style={styles.foreground}>
        <View
          style={[
            styles.header,
            media && styles.headerBubbly,
          ]}
        >
          {heading && !availabilityListing && !opportunityListing &&
            <Text style={styles.heading}>
              {heading}
            </Text>
          }

          <ContentTileForegroundPoll
            poll={poll}
            onSelect={onPollOptionSelect}
          />
        </View>

        <ContentTileForegroundAvailabilityListing
          creator={creator}
          heading={heading}
          body={body}
          availabilityListing={availabilityListing}
        />

        <ContentTileForegroundOpportunityListing
          heading={heading}
          subHeading={subHeading}
          opportunityListing={opportunityListing}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  foreground: {
    marginTop: 100,
    paddingRight: 30,
    paddingBottom: 30,
    paddingLeft: 30,
  },
  heading: {
    fontSize: 17,
    lineHeight: 24,
  },
  headerBubbly: {
    borderRadius: 17,
    paddingTop: 15,
    paddingRight: 20,
    paddingBottom: 15,
    paddingLeft: 20,
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
});

export default ContentTileForeground;
