import * as React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ScreenHeader from '~/components/ScreenHeader';

function CopyrightScreen({ navigation }) {
  return (
    <SafeAreaView>
      <ScreenHeader
        heading="Copyright"
        onClose={() => navigation.goBack()}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.paragraph}>
          We at Declaration respect the rights of artists and creators and
          hope you will work with us to keep our community a creative, legal
          and positive experience for everyone.
        </Text>
        <Text style={styles.heading}>
          What Is copyright infringement?
        </Text>
        <Text style={styles.paragraph}>
          Copyright infringement occurs when a copyrighted work is
          reproduced, distributed, performed, publicly displayed, or made
          into a derivative work without the permission of the copyright
          owner. Posting copyright-infringing content can lead to the
          termination of your account, and possibly monetary damages if a
          copyright owner decides to take legal action.
        </Text>
        <Text style={styles.heading}>
          How do I make sure my content does not infringe someone else’s
          copyrights?
        </Text>
        <Text style={styles.paragraph}>
          The best way to ensure that your content doesn't infringe someone
          else's copyright is to be sure that all components of your content
          are your original creation. For example, if you use an audio track of
          a sound recording owned by a record label without that record label's
          permission, your content may be infringing the copyrights of others, and
          may be subject to removal.
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

export default CopyrightScreen;
