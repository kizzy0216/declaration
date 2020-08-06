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
import { IS_IOS } from '~/constants';
import TextInput from '~/components/TextInput';
import TextInputGroup from '~/components/TextInputGroup';

function CreateContentAvailabilityListingScreen({ navigation }) {
  const [heading, setHeading] = useState('');
  const [body, setBody] = useState('');
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
        heading="Add availability listing"
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
              label="Add a headline"
              placeholder="I'm available for and looking for an opportunity as an interior designer."
              value={heading}
              onChange={setHeading}
              multiline={true}
              minHeight={50}
              maxHeight={50}
            />
          </View>

          <View style={styles.row}>
            <TextInput
              label="Add body copy"
              placeholder="I’ve created, managed, and implemented every step of client projects - sourcing products and materials."
              value={body}
              onChange={setBody}
              multiline={true}
              minHeight={100}
              maxHeight={100}
            />
          </View>

          <View style={styles.row}>
            <TextInputGroup
              label="Add highlights"
              options={criteria}
              renderPlaceholder={(option, index) => `Enter highlight ${index + 1}`}
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

export default CreateContentAvailabilityListingScreen;
