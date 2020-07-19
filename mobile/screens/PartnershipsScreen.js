import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Link from '~/components/Link';
import ScreenHeader from '~/components/ScreenHeader';

function PartnershipsScreen({ navigation }) {
  return (
    <SafeAreaView>
      <ScreenHeader
        heading="Partnerships"
        onClose={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          At this point, Declaration is in its infancy. We're still figuring
          out just how powerful a tool it can be and how best it can serve
          our members and the public at large. If you have some ideas and are
          interested in partnering with us in a manner that respects our members
          and their work without seeking to exploit either, please email us at&nbsp;
          <Link href="mailto:partnerships@declaration.net">
            partnerships@declaration.net
          </Link>
          &nbsp;and let’s get a conversation going.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
  },
  paragraph: {
    marginBottom: 20,
    lineHeight: 20,
  },
});

export default PartnershipsScreen;
