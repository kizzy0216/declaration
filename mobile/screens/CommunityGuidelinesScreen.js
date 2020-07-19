import * as React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ScreenHeader from '~/components/ScreenHeader';

function CommunityGuidelinesScreen({ navigation }) {
  return (
    <SafeAreaView>
      <ScreenHeader
        heading="Community guidelines"
        onClose={() => navigation.goBack()}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.heading}>
          Respect the Declaration community
        </Text>
        <Text style={styles.paragraph}>
          Every community feature on Declaration involves a certain level of
          trust. We ask that you respect and help foster that trust.
        </Text>
        <Text style={styles.heading}>
          Use common sense
        </Text>
        <Text style={styles.paragraph}>
          The following guidelines will help keep you from making any missteps:
        </Text>
        <Text style={styles.paragraph}>
          Declaration is not for pornography or sexually explicit content. If
          this describes your content, even if it’s content of yourself,
          please don’t post it on Declaration. Also, be advised that we work
          closely with law enforcement and report child exploitation.
        </Text>
        <Text style={styles.paragraph}>
          Don’t post content showing animal abuse, drug abuse, under-age
          drinking and smoking, or bomb making.
        </Text>
        <Text style={styles.paragraph}>
          Graphic or gratuitous violence is not allowed. If your content
          involves someone being physically hurt, attacked, or humiliated,
          please don’t post it.
        </Text>
        <Text style={styles.paragraph}>
          Declaration is not a shock site. Please don’t post content intended
          to shock or disgust.
        </Text>
        <Text style={styles.paragraph}>
          Respect copyright. Only upload content that you made or that you are
          authorized to use. Don’t upload content you didn't make or use
          material in your content that someone else owns the copyright to
          without necessary authorizations. Read our Copyright Tips for more
          information.
        </Text>
        <Text style={styles.paragraph}>
          We encourage free speech and defend everyone’s right to express
          unpopular points of view. But we don’t permit hate speech (speech
          that attacks or demeans a group based on race or ethnic origin,
          religion, disability, gender, age, veteran status, and sexual
          orientation/gender identity).
        </Text>
        <Text style={styles.paragraph}>
          Predatory behavior such as stalking, threats, harassment,
          intimidation, impersonation, invading privacy, revealing other
          people’s personal information, and inciting others to commit
          violent acts or to violate the Terms of Use are taken very
          seriously. Anyone caught doing these things may be permanently
          banned from Declaration.
        </Text>
        <Text style={styles.paragraph}>
          Please don’t generate spam by creating misleading descriptions, tags,
          titles or thumbnails or any other means in order to increase views.
          It is not okay to post large amounts of untargeted, unwanted or
          repetitive content, including comments and private messages.
        </Text>
        <Text style={styles.paragraph}>
          Please take these rules seriously and respect the spirit in which
          they were created.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
  },
  contentContainer: {
    paddingBottom: 50,
  },
  heading: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paragraph: {
    marginBottom: 20,
    lineHeight: 20,
  },
});

export default CommunityGuidelinesScreen;
