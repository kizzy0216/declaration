import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ScreenHeader from '~/components/ScreenHeader';
import Link from '~/components/Link';

function ContactUsScreen({ navigation }) {
  return (
    <SafeAreaView>
      <ScreenHeader
        heading="Contact us"
        onClose={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Declaration is a fluid, dynamic and ever-evolving site. We rely on
          the input of members and casual visitors alike in order to help us
          ensure the archive grows in the right direction and serves the greatest
          good.
        </Text>
        <Text style={styles.paragraph}>
          If you have any questions or comments or are interested in
          partnering with us, please let us know by emailing us at&nbsp;
          <Link href="mailto:hi@declaration.net">
            hi@declaration.net
          </Link>
          .
        </Text>
        <Text style={styles.paragraph}>
          Your feedback is greatly appreciated.
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

export default ContactUsScreen;
