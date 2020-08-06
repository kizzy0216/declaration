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
        screenName: 'CreateJustText',
      },
      {
        imageSource: require('~/assets/images/content-template-just-single-choice-poll-card.png'),
        screenName: 'CreateJustSingleChoicePoll',
      },
      {
        imageSource: require('~/assets/images/content-template-just-multiple-choice-poll-card.png'),
        screenName: 'CreateJustMultipleChoicePoll',
      },
    ],
  },
  {
    heading: 'Media',
    templates: [
      {
        imageSource: require('~/assets/images/content-template-just-image-card.png'),
        screenName: 'CreateJustImage',
      },
      {
        videoSource: require('~/assets/videos/content-template-just-video-card.mp4'),
        screenName: 'CreateJustVideo',
      },
    ],
  },
  {
    heading: 'Mixed media',
    templates: [
      {
        imageSource: require('~/assets/images/content-template-media-with-text-card.png'),
        videoSource: require('~/assets/videos/content-template-media-with-text-card.mp4'),
        screenName: 'CreateMediaWithText',
      },
      {
        imageSource: require('~/assets/images/content-template-media-with-single-choice-poll-card.png'),
        screenName: 'CreateMediaWithSingleChoicePoll',
      },
      {
        imageSource: require('~/assets/images/content-template-media-with-multiple-choice-poll-card.png'),
        screenName: 'CreateMediaWithMultipleChoicePoll',
      },
    ],
  },
  {
    heading: 'Business',
    templates: [
      {
        imageSource: require('~/assets/images/content-template-opportunity-listing-card.png'),
        screenName: 'CreateOpportunityListing',
      },
      {
        imageSource: require('~/assets/images/content-template-session-card.png'),
        screenName: 'CreateSession',
      },
      {
        imageSource: require('~/assets/images/content-template-availability-listing-card.png'),
        screenName: 'CreateAvailabilityListing',
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
