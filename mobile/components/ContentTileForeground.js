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
        {(heading || poll) && !availabilityListing && !opportunityListing &&
          <View
            style={[
              styles.headingWrapper,
              media && styles.headingBubbly,
            ]}
          >
            {heading && !availabilityListing && !opportunityListing &&
              <Text
                style={[
                  styles.heading,
                ]}
              >
                {heading}
              </Text>
            }
          </View>
        }

        <ContentTileForegroundPoll
          poll={poll}
          onSelect={onPollOptionSelect}
        />

        <ContentTileForegroundAvailabilityListing
          creator={creator}
          heading={heading}
          body={body}
          availabilityListing={availabilityListing}
          hasMedia={!!media}
        />

        <ContentTileForegroundOpportunityListing
          heading={heading}
          subHeading={subHeading}
          opportunityListing={opportunityListing}
          hasMedia={!!media}
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
  headingBubbly: {
    borderRadius: 17,
    paddingTop: 15,
    paddingRight: 20,
    paddingBottom: 15,
    paddingLeft: 20,
    backgroundColor: 'white',
  },
});

export default ContentTileForeground;
