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
    <SafeAreaView pointerEvents="box-none">
      <View
        style={{...styles.foreground, paddingRight: 90}}
        pointerEvents="box-none"
      >
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
                numberOfLines={15}
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
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 24,
  },
  headingBubbly: {
    borderRadius: 17,
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    backgroundColor: 'white',
  },
});

export default ContentTileForeground;
