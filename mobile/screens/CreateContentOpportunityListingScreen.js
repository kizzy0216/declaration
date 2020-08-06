import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CreateHeader from '~/components/CreateHeader';
import TextInput from '~/components/TextInput';
import TextInputGroup from '~/components/TextInputGroup';
import { IS_IOS } from '~/constants';

function CreateContentOpportunityListingScreen({ navigation }) {
  const [heading, setHeading] = useState('');
  const [subHeading, setSubHeading] = useState('');
  const [criteria, setCriteria] = useState([
    '',
    '',
    '',
  ]);
  const isDisabled = (false);

  return (
    <SafeAreaView
      style={{flex: 1}}
      contentContainerStyle={{flex: 1}}
    >
      <CreateHeader
        heading="Add opportunity listing"
        canCancel={true}
        canBack={false}
        canNext={true}
        canPost={false}
        isNextOrPostDisabled={isDisabled}
        onNextOrPost={() => navigation.navigate('CreateContentMeta')}
        onCancelOrBack={() => navigation.goBack()}
      />
      <KeyboardAvoidingView
        behavior={IS_IOS ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.row}>
            <TextInput
              label="Add a short headline"
              placeholder="We are hiring"
              value={heading}
              onChange={setHeading}
            />
          </View>

          <View style={styles.row}>
            <TextInput
              label="Name the position title"
              placeholder="Senior Graphic Designer"
              value={subHeading}
              onChange={setSubHeading}
            />
          </View>

          <View style={styles.row}>
            <TextInputGroup
              label="Add criteria"
              options={criteria}
              renderPlaceholder={(option, index) => `Enter criteria ${index + 1}`}
              onChange={setCriteria}
            />
          </View>
          <View style={styles.row}>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    paddingTop: 30,
    paddingRight: 30,
    paddingLeft: 30,
    paddingBottom: 100,
  },
  row: {
    marginBottom: 30,
  },
});

export default CreateContentOpportunityListingScreen;
