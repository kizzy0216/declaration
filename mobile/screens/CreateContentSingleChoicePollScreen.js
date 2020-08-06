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
import {
  LIGHT_GRAY,
  IS_IOS,
} from '~/constants';

function CreateContentSingleChoicePoll({ navigation, route }) {
  const { withMedia } = route.params || {};

  const [text, setText] = useState('');
  const [options, setOptions] = useState([
    'Yes',
    'No',
  ]);

  return (
    <SafeAreaView
      style={{flex: 1}}
      contentContainerStyle={{flex: 1}}
    >
      <CreateHeader
        heading="Add single choice poll"
        canCancel={true}
        canBack={false}
        canNext={true}
        canPost={false}
        isNextOrPostDisabled={text === ''}
        onNextOrPost={() => navigation.navigate(withMedia ? 'CreateContentMedia' : 'CreateContentMeta')}
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
              multiline={true}
              minHeight={100}
              maxHeight={150}
              label="Add your question or idea"
              placeholder="Be specific with your idea or question"
              value={text}
              onChange={setText}
            />
          </View>

          <View style={styles.row}>
            <TextInputGroup
              label="Poll options"
              options={options}
              onChange={setOptions}
            />
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

export default CreateContentSingleChoicePoll;
