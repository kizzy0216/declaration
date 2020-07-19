import * as React from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ScreenHeader from '~/components/ScreenHeader';

function PrivacyPolicyScreen({ navigation }) {
  return (
    <SafeAreaView>
      <ScreenHeader
        heading="Privacy policy"
        onClose={() => navigation.goBack()}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.heading}>
          Your Declaration account
        </Text>
        <Text style={styles.paragraph}>
          For some activities on Declaration, like uploading content or
          contacting members, you need a Declaration Account. We ask for some
          personal information when you create an account, including your
          email address, which is used to protect your account from
          unauthorized access.
        </Text>
        <Text style={styles.heading}>
          Usage information
        </Text>
        <Text style={styles.paragraph}>
          When you use Declaration, we may record information
          about your usage of the site, such as the channels, groups and
          favorites you subscribe to, which other users you communicate with,
          the members you follow, the frequency and size of data transfers, and
          information you display about yourself as well as information you
          click on in Declaration (including UI elements, settings). If you are
          logged in, we may associate that information with your Declaration
          Account. In order to ensure the quality of our service to you, we may
          place a tag (also called a "web beacon") in HTML-based customer
          support emails or other communications with you in order to confirm
          delivery.
        </Text>
        <Text style={styles.heading}>
          Content uploaded to the platform
        </Text>
        <Text style={styles.paragraph}>
          Any personal information or content that you voluntarily disclose
          online (e.g., your profile page) may be collected and used by
          others.
        </Text>
        <Text style={styles.heading}>
          Uses
        </Text>
        <Text style={styles.paragraph}>
          If you submit personal information to Declaration, we may use that
          information to operate, maintain, and improve the features and
          functionality of Declaration, and to process any flagging activity
          or other communication you send to us.
        </Text>
        <Text style={styles.paragraph}>
          We do not use your email address or other personal information to
          send commercial or marketing messages without your consent. We may
          use your email address without further consent for non-marketing or
          administrative purposes (such as notifying you of major Declaration
          changes or for customer service purposes). You also can choose how
          often Declaration sends you email updates in your Declaration Account
          settings page.
        </Text>
        <Text style={styles.paragraph}>
          We use cookies, web beacons, and log file information to: (a) store
          information so that you will not have to re-enter it during your
          visit or the next time you visit Declaration; (b) provide custom,
          personalized content and information; (c) monitor the effectiveness
          of our marketing campaigns; (d) monitor aggregate metrics such as
          total number of visitors and pages viewed; and (e) track your
          entries, submissions, and status in promotions, sweepstakes, and
          contests.
        </Text>
        <Text style={styles.heading}>
          Information that is publicly available
        </Text>
        <Text style={styles.paragraph}>
          When you create a DeclarationAccount, some information about your
          Declaration Account and your account activity will be provided to
          other users of Declaration. This may include the date you opened your
          Declaration Account, the date you last logged into your Declaration
          Account, your age (if you choose to make it public), the country
          where you reside and the number of pages you have viewed.
        </Text>
        <Text style={styles.paragraph}>
          Your Declaration Account name, not your email address, is displayed
          to other users when you engage in certain activities on Declaration,
          such as when you upload content or send messages through Declaration.
          Other users can contact you by leaving a message or comment on the
          site.
        </Text>
        <Text style={styles.paragraph}>
          Any content that you submit to Declaration may be redistributed
          through the internet and other media channels, and may be viewed by
          other Declaration users or the general public.
        </Text>
        <Text style={styles.paragraph}>
          You may also choose to add personal information which may include
          your name, gender, profile picture or other details, that will be
          visible to other users on your Declaration Account channel page. If
          you choose to add certain features to your Declaration Account
          channel page, then these features and your activity associated with
          these features will be displayed to other users and may be aggregated
          and shared with your friends or other users. Such shared activity may
          include your favorite content and content that you have uploaded.
        </Text>
        <Text style={styles.heading}>
          Your choices
        </Text>
        <Text style={styles.paragraph}>
          If you have a Declaration Account, you may update or
          correct your personal profile information, email preferences and
          privacy settings at any time by visiting your account profile page.
        </Text>
        <Text style={styles.paragraph}>
          You may control the information that is available to other users and
          your confirmed connections at any time by editing your Declaration
          Account and the features that are included on your profile.
        </Text>
        <Text style={styles.paragraph}>
          You may, of course, decline to submit personal information through
          Declaration, in which case you can still explore Declaration, but
          Declaration may not be able to provide certain services to you. Some
          advanced Declaration services may use outside parties. The privacy
          notices of those services govern the use of your personal information
          associated with them.
        </Text>
        <Text style={styles.heading}>
          Advertising on Declaration
        </Text>
        <Text style={styles.paragraph}>
          Declaration may use a range of information including cookies, web
          beacons, IP addresses, usage data and other non-personal
          information about your computer or device (such as browser type and
          operating system) to provide you with relevant advertising. If you
          are logged into your Declaration Account, we may also show you
          advertising based on the information you have provided to us in
          your Declaration Account.
        </Text>
        <Text style={styles.paragraph}>
          Other third-party ad serving companies may display ads on
          Declaration, provided they comply with our ad serving requirements.
          Declaration does not provide any personal information to these
          third-party ad servers or ad networks without your consent. You
          should consult the respective privacy policies of these third-party
          ad servers or ad networks for more information on their practices and
          for instructions on how to opt-out of certain practices.
          Declaration's privacy policy does not apply to, and we cannot control
          the activities of, such other advertisers or web sites. Any data
          obtained by third-party ad servers subsequently shared with
          Declaration is maintained and dealt with by Declaration in accordance
          with this privacy policy.
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

export default PrivacyPolicyScreen;
