import * as React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ScreenHeader from '~/components/ScreenHeader';

function TermsOfUseScreen({ navigation }) {
  return (
    <SafeAreaView>
      <ScreenHeader
        heading="Terms of use"
        onClose={() => navigation.goBack()}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.paragraph}>
          Use of our Service and this website is governed by the terms and
          conditions described below. Please read them carefully. Your use of
          our Service and this website indicates your acceptance of these terms
          and conditions. Declaration Archive LLC (the “Company”) reserves the
          right to make modifications to these Terms & Conditions of Use at any
          time. You accept the obligation to review these Terms & Conditions of
          Use prior to each use, and your use of this website constitutes an
          acceptance to be bound by any modifications. These Terms & Conditions
          of Use are referred to hereafter as the “Agreement”.
        </Text>
        <Text style={styles.heading}>
          1. The service license
        </Text>
        <Text style={styles.paragraph}>
          The term “Service” shall mean (a) the Internet
          web pages, data, analyses, screens, reports, documentation and other
          information of any kind that are accessible through the Company’s web
          application (the “Website”), as well as all updates, enhancements and
          modifications thereto, and all intellectual property contained
          therein, (b) the products, services, software and other content
          offered to Users in the manner described on the Website and (c)
          communications from the Company to Users.
        </Text>
        <Text style={styles.heading}>
          2. Grant of license
        </Text>
        <Text style={styles.paragraph}>
          Subject to the terms and conditions of this Agreement, the Company
          grants to you, the “User”, during the Term (as defined in Section 6
          below), a limited nonexclusive, nontransferable, revocable license
          solely in connection with User’s personal use, and not for resale or
          public performance of any kind, to access and use
          the Service (or any portions thereof). The Company reserves the right
          at all times and without notice to (i) restrict or prevent User’s
          access to the Service (or any portion thereof); and (ii) modify or
          discontinue providing the Service (or any portion thereof). The Company
          shall have no obligation to correct or update the Service. For the
          purposes of the license grant in this Section 2, the term “User” shall
          include individuals and any entity on behalf of which this Agreement is
          being reviewed and accepted and such entity’s employees and other
          individual users.
        </Text>
        <Text style={styles.heading}>
          3. Restrictions on use
        </Text>
        <Text style={styles.paragraph}>
          User may not (i) use, copy, modify, merge, install, transfer or
          distribute the Service, except as expressly provided in this
          Agreement; (ii) reverse-engineer, decompile, translate, disassemble
          or separate the components of the Service
          (including, without limitation, viewing or otherwise obtaining source
          code); (iii) sublicense, rent, sell or lease the Service or any part
          thereof; (iv) use the Service or any part thereof for third-party
          training, commercial time-sharing or service bureau use, except as
          expressly provided in this Agreement or on the Website; (v) remove
          from the Service or alter any copyright or trademark notice contained
          therein; (vi) use the Website for any unlawful purpose; (vii) express
          or imply that any statements User makes are endorsed by us, without
          our prior written consent; (viii) transmit (a) any content or
          information that is unlawful, fraudulent, threatening, abusive,
          libelous, defamatory, obscene or otherwise objectionable, or
          infringes on our or any third party’s intellectual property or other
          rights, (b) any material, non-public information about individuals or
          companies without the authorization to do so, (c) any trade secret of
          any third party, or (d) any advertisements, solicitations, chain
          letters, pyramid schemes, investment opportunities, or other
          unsolicited commercial communication (except as otherwise expressly
          permitted by us), or engage in spamming or flooding; (ix) transmit
          any software or other materials that contain any virus, worm, time
          bomb, Trojan horse, or other harmful or disruptive component; (x)
          “frame” or “mirror” any part of the Website without our prior written
          authorization; (xi) use any robot, spider, site search/retrieval
          application, or other manual or automatic device or process to
          retrieve, index, “data mine”, or in any way reproduce or circumvent
          the navigational structure or presentation of the Website or its
          contents; (xii) harvest or collect information about Website visitors
          or members without their express consent; or (xiii) post or otherwise
          distribute material that is subject to a copyright unless you are the
          owner of such copyright or you have been granted permission for such
          actions from the copyright owner. The foregoing restrictions on use
          may be modified, expanded or reduced by the Company elsewhere on the
          Website. In such case, such modification, expansion or reduction shall be
          incorporated herein as if stated in full herein.
        </Text>
        <Text style={styles.heading}>
          4. Submissions and Postings
        </Text>
        <Text style={styles.paragraph}>
          Please note that, because we allow Users to post text, software,
          images, scripts, graphics, photographs, sounds, music, videos,
          audiovisual materials and other information and intellectual property
          on the Website and therefore redistribute materials you give us, we
          acquire certain rights in those materials. Therefore, by sending or
          transmitting to us information, opinions, creative suggestions, ideas, notes,
          concepts, or other materials (collectively, “Materials”), or by posting
          such Materials to any area of the Website, you grant us and our designees a
          worldwide, non-exclusive, assignable, royalty-free right to use, reproduce,
          distribute (through multiple tiers), publicly display and import such
          Materials in any media now known or hereafter developed, for any purpose
          whatsoever, commercial or otherwise, without compensation to the provider of
          the Materials. None of the Materials shall be subject to any obligation,
          whether of confidentiality, attribution, or otherwise, on our part and we
          shall not be liable for any use or disclosure of any Materials. The foregoing
          rights may be modified, expanded or reduced by the Company elsewhere on the
          Website. In such case, such modification, expansion or reduction shall be
          incorporated herein as if stated in full herein. You are solely responsible
          for your communications and the consequences of their posting and for the
          content and information you provide, distribute, post, include, link to, or
          otherwise upload to our Website. You also agree that we are only acting as a
          passive conduit for the online distribution and publication of your content.
          However, although we are not obligated, we reserve the right to take any
          action with respect to your content if we believe that it may create a
          liability for us.
        </Text>
        <Text style={styles.heading}>
          5. Forums
        </Text>
        <Text style={styles.paragraph}>
          a) We neither endorse nor are responsible for any opinion,
          advice, information, or statement made or displayed on the Website by
          Users. We are not responsible for any errors or omissions in articles or
          postings, for hyperlinks embedded in messages, or for any results obtained
          from the use of such information. Under no circumstances will we or our
          affiliates, suppliers, or agents be liable for any loss or damage caused by
          your reliance on such information obtained through the Website. We cannot and
          do not take responsibility for the veracity, reliability, or completeness of
          any opinion, advice, information, or statement available on the Website.
        </Text>
        <Text style={styles.paragraph}>
          (b) The opinions expressed on the Website by Users reflect solely the
          opinions of the Users who post thereon and do not reflect the opinions of the
          Company. We have no obligation to monitor User postings on the Website.
          However, User acknowledges and agrees that we have the right (but not the
          obligation) to monitor the Website and the materials any User may
          transmit or post; to alter or remove any such materials; and to disclose such
          materials and the circumstances surrounding their transmission to any third
          party in order to operate the Website properly; to protect ourselves, our
          suppliers, sponsors, or advertisers and our members and visitors; and to
          comply with legal obligations or governmental requests.
        </Text>
        <Text style={styles.paragraph}>
          (c) Users of the Website must not post sexual, ethnic or racial or
          other discriminating slurs, or material which contains profanity or no
          relevant or constructive content. Nor shall users identify individuals in a
          negative or derogatory fashion. Users are also prohibited from posting any
          proprietary information, trade secrets or confidential information which is
          the property of any other individual or entity, without the permission of
          such individual or entity. Although the Company has no obligation to do so,
          the Company may monitor messages and other information posted on its
          Website and reserves the right to delete portions of or entire posts which
          violate the above rules, messages or topics that are unrelated to the
          Service, and advertisements or other commercial messages. If you believe a
          message violates our member policies, please contact the Company immediately
          at info@declaration.net so that we can consider its editing or removal.
        </Text>
        <Text style={styles.heading}>
          6. Term
        </Text>
        <Text style={styles.paragraph}>
          The term of this Agreement (the “Term”) shall commence on the
          date on which User first accesses or utilizes the Service or the Website in
          any way (the “Effective Date”) and will continue so long as User continues
          to access or utilize the Service or the Website.
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

export default TermsOfUseScreen;
