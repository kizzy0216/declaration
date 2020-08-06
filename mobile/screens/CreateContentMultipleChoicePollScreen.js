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

function CreateContentMultipleChoicePoll({ navigation }) {
  const [text, setText] = useState('');
  const [options, setOptions] = useState([
    '',
    '',
    '',
  ]);

  const isDisabled = (
    text === '' ||
    options.filter(x => x.length === 0).length > 0
  );

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
        isNextOrPostDisabled={isDisabled}
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
              {options.map((option, index) => (
                <View
                  style={styles.inputRow}
                  key={index}
                >
                  <View style={styles.inputRowInputWrapper}>
                    <TextInput
                      placeholder={`Enter option ${index + 1}`}
                      value={option}
                      theme="secondary"
                      onChange={(updatedOption) =>
                        setOptions(
                          options.map((currentOption, currentIndex) => (
                            currentIndex === index
                            ? updatedOption
                            : currentOption
                          ))
                        )
                      }
                    />
                  </View>
                </View>
              ))}
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

export default CreateContentMultipleChoicePoll;
