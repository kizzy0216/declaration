import React, { useContext} from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CreateContentContext } from '~/contexts/CreateContentContext';
import CreateHeader from '~/components/CreateHeader';
import ContentTemplateScrollView from '~/components/ContentTemplateScrollView';
import {
  BASE_CONTENT_TEMPLATE_TYPE,
  POLL_CONTENT_TEMPLATE_TYPE,
  AVAILABILITY_LISTING_CONTENT_TEMPLATE_TYPE,
  OPPORTUNITY_LISTING_CONTENT_TEMPLATE_TYPE,
  EVENT_CONTENT_TEMPLATE_TYPE,
  SESSION_CONTENT_TEMPLATE_TYPE,
} from '@shared/constants';

const templatesByCategory = [
  {
    heading: 'Text only',
    templates: [
      {
        heading: 'Text only',
        imageSource: require('~/assets/images/content-template-just-text-card.png'),
        screenName: 'CreateContentText',
        type: BASE_CONTENT_TEMPLATE_TYPE,
      },
      {
        heading: 'Single choice poll',
        imageSource: require('~/assets/images/content-template-just-single-choice-poll-card.png'),
        screenName: 'CreateContentPoll',
        screenOptions: {
          withMedia: false,
          countOptions: 2,
        },
        type: POLL_CONTENT_TEMPLATE_TYPE,
      },
      {
        heading: 'Multiple choice poll',
        imageSource: require('~/assets/images/content-template-just-multiple-choice-poll-card.png'),
        screenName: 'CreateContentPoll',
        screenOptions: {
          withMedia: false,
          countOptions: 3,
        },
        type: POLL_CONTENT_TEMPLATE_TYPE,
      },
    ],
  },
  {
    heading: 'Multimedia',
    templates: [
      {
        heading: 'Image only',
        imageSource: require('~/assets/images/content-template-just-image-card.jpg'),
        screenName: 'CreateContentMedia',
        screenOptions: {
          isJustImage: true,
        },
        type: BASE_CONTENT_TEMPLATE_TYPE,
      },
      {
        heading: 'Video only',
        videoSource: require('~/assets/videos/content-template-just-video-card.mp4'),
        screenName: 'CreateContentMedia',
        screenOptions: {
          isJustVideo: true,
        },
        type: BASE_CONTENT_TEMPLATE_TYPE,
      },
      {
        heading: 'Media + text',
        imageSource: require('~/assets/images/content-template-media-with-text-card.png'),
        videoSource: require('~/assets/videos/content-template-media-with-text-card.mp4'),
        screenName: 'CreateContentText',
        screenOptions: {
          withMedia: true,
        },
        type: BASE_CONTENT_TEMPLATE_TYPE,
      },
      {
        heading: 'Media + single choice poll',
        imageSource: require('~/assets/images/content-template-media-with-single-choice-poll-card.png'),
        screenName: 'CreateContentPoll',
        screenOptions: {
          withMedia: true,
          countOptions: 2,
        },
        type: POLL_CONTENT_TEMPLATE_TYPE,
      },
      {
        heading: 'Media + multiple choice poll',
        imageSource: require('~/assets/images/content-template-media-with-multiple-choice-poll-card.png'),
        videoSource: require('~/assets/videos/content-template-media-with-multiple-choice-poll-card.mp4'),
        screenName: 'CreateContentPoll',
        screenOptions: {
          withMedia: true,
          countOptions: 3,
        },
        type: POLL_CONTENT_TEMPLATE_TYPE,
      },
    ],
  },
  {
    heading: 'Business',
    templates: [
      {
        heading: 'Opportunity',
        imageSource: require('~/assets/images/content-template-opportunity-listing-card.png'),
        screenName: 'CreateContentOpportunityListing',
        type: OPPORTUNITY_LISTING_CONTENT_TEMPLATE_TYPE,
      },
      {
        heading: 'Availability',
        imageSource: require('~/assets/images/content-template-availability-listing-card.png'),
        screenName: 'CreateContentAvailabilityListing',
        type: AVAILABILITY_LISTING_CONTENT_TEMPLATE_TYPE,
      },
    ],
  },
  {
    heading: 'Coming soon',
    templates: [
      {
        heading: '1:1 Session',
        videoSource: require('~/assets/videos/content-template-session-card.mp4'),
        screenName: '',
        type: SESSION_CONTENT_TEMPLATE_TYPE,
      },
      {
        heading: 'Event',
        imageSource: require('~/assets/images/content-template-event-card.jpg'),
        screenName: '',
        type: EVENT_CONTENT_TEMPLATE_TYPE,
      },
    ],
  },
];

function CreateContentSelectTemplateScreen({ navigation }) {
  const { setType } = useContext(CreateContentContext);

  return (
    <SafeAreaView>
      <CreateHeader
        heading="New post"
        onCancelOrBack={() => navigation.goBack()}
        canCancel={true}
        canBack={false}
        canPost={false}
        canNext={false}
      />
      <ScrollView
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.title}>
          Choose a{'\n'}
          post template
        </Text>
        {templatesByCategory.map((category) => (
          <View
            style={styles.scrollViewWrapper}
            key={category.heading}
          >
            <ContentTemplateScrollView
              heading={category.heading}
              templates={category.templates}
              onTemplatePress={({ screenName, screenOptions, type }) => {
                if (screenName && screenName.length > 0) {
                  setType(type);
                  navigation.navigate(screenName, screenOptions);
                }
              }}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 70,
    fontSize: 40,
    lineHeight: 40,
    fontWeight: '600',
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 50,
  },
  contentContainer: {
    paddingBottom: 120,
  },
  scrollViewWrapper: {
    marginBottom: 50,
  },
});

export default CreateContentSelectTemplateScreen;
