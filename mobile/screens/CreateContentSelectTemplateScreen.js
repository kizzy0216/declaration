import * as React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CreateHeader from '~/components/CreateHeader';
import ContentTemplateScrollView from '~/components/ContentTemplateScrollView';

const templatesByCategory = [
  {
    heading: 'Typography',
    templates: [
      {
        imageSource: require('~/assets/images/content-template-just-text-card.png'),
        screenName: 'CreateContentText',
      },
      {
        imageSource: require('~/assets/images/content-template-just-single-choice-poll-card.png'),
        screenName: 'CreateContentSingleChoicePoll',
      },
      {
        imageSource: require('~/assets/images/content-template-just-multiple-choice-poll-card.png'),
        screenName: 'CreateContentMultipleChoicePoll',
      },
    ],
  },
  {
    heading: 'Media',
    templates: [
      {
        imageSource: require('~/assets/images/content-template-just-image-card.png'),
        screenName: 'CreateContentMedia',
        screenOptions: {
          isJustImage: true,
        },
      },
      {
        videoSource: require('~/assets/videos/content-template-just-video-card.mp4'),
        screenName: 'CreateContentMedia',
        screenOptions: {
          isJustVideo: true,
        },
      },
    ],
  },
  {
    heading: 'Mixed media',
    templates: [
      {
        imageSource: require('~/assets/images/content-template-media-with-text-card.png'),
        videoSource: require('~/assets/videos/content-template-media-with-text-card.mp4'),
        screenName: 'CreateContentText',
        screenOptions: {
          withMedia: true,
        },
      },
      {
        imageSource: require('~/assets/images/content-template-media-with-single-choice-poll-card.png'),
        screenName: 'CreateContentSingleChoicePoll',
        screenOptions: {
          withMedia: true,
        },
      },
      {
        imageSource: require('~/assets/images/content-template-media-with-multiple-choice-poll-card.png'),
        screenName: 'CreateContentMultipleChoicePoll',
        screenOptions: {
          withMedia: true,
        },
      },
    ],
  },
  {
    heading: 'Business',
    templates: [
      {
        imageSource: require('~/assets/images/content-template-opportunity-listing-card.png'),
        screenName: 'CreateContentOpportunityListing',
      },
      {
        imageSource: require('~/assets/images/content-template-session-card.png'),
        screenName: 'CreateContentSession',
      },
      {
        imageSource: require('~/assets/images/content-template-availability-listing-card.png'),
        screenName: 'CreateContentAvailabilityListing',
      },
    ],
  },
  {
    heading: 'Events',
    templates: [
      {
        imageSource: require('~/assets/images/content-template-event-card.png'),
        videoSource: require('~/assets/videos/content-template-event-card.mp4'),
        screenName: 'CreateContentEvent',
      },
    ],
  },
];

function CreateOverviewScreen({ navigation }) {
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
              onTemplatePress={({ screenName, screenOptions }) =>
                navigation.navigate(screenName, screenOptions)
              }
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 80,
    fontSize: 40,
    lineHeight: 40,
    fontWeight: '600',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 50,
  },
  contentContainer: {
    paddingBottom: 120,
  },
  scrollViewWrapper: {
    marginBottom: 50,
  },
});

export default CreateOverviewScreen;
