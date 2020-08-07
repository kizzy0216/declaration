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

function CreateContentEventScreen({ navigation }) {
  const [heading, setHeading] = useState('');

  const isDisabled = (false);

  return (
    <SafeAreaView
      style={{flex: 1}}
      contentContainerStyle={{flex: 1}}
    >
      <CreateHeader
        heading="Add event"
        canCancel={true}
        canBack={false}
        canNext={true}
        canPost={false}
        isNextOrPostDisabled={isDisabled}
        onNextOrPost={() => navigation.navigate('CreateContentMedia', {
          nextScreenName: 'CreateContentPaylock',
        })}
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
              label="Event title"
              placeholder="Build a strong brand with social media"
              value={heading}
              onChange={setHeading}
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

export default CreateContentEventScreen;
