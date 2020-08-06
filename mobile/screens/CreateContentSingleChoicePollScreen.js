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
import {
  LIGHT_GRAY,
  IS_IOS,
} from '~/constants';

function CreateContentSingleChoicePoll({ navigation }) {
  const [text, setText] = useState('');
  const [firstOption, setFirstOption] = useState('Yes');
  const [secondOption, setSecondOption] = useState('No');

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
        onNextOrPost={() => navigation.navigate('CreateContentReachScreen')}
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
            <Text style={styles.inputGroupLabel}>
              Poll options
            </Text>

            <View style={styles.inputGroup}>
              <View style={styles.inputRow}>
                <View style={styles.inputRowInputWrapper}>
                  <TextInput
                    value={firstOption}
                    theme="secondary"
                    onChange={setFirstOption}
                  />
                </View>
              </View>

              <View style={styles.inputRow}>
                <View style={styles.inputRowInputWrapper}>
                  <TextInput
                    value={secondOption}
                    theme="secondary"
                    onChange={setSecondOption}
                  />
                </View>
              </View>
            </View>
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

  inputGroup: {
    backgroundColor: LIGHT_GRAY,
    borderRadius: 22,
    paddingTop: 30,
    paddingRight: 30,
    paddingBottom: 25,
    paddingLeft: 30,
  },
  inputGroupLabel: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  inputRowLabel: {
    paddingRight: 10,
  },
  inputRowInputWrapper: {
    flexGrow: 1,
  },
});

export default CreateContentSingleChoicePoll;
