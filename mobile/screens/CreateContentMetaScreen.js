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
import Button from '~/components/Button';
import Picker from '~/components/Picker';
import { IS_IOS } from '~/constants';

const NETWORK_REACH = 'NETWORK_REACH';
const CONNECTIONS_REACH = 'CONNECTIONS_REACH';
const PRIVATE_REACH = 'PRIVATE_REACH';

const REACH_OPTIONS = [
  {
    label: 'Network',
    value: NETWORK_REACH,
  },
  {
    label: 'Connections only',
    value: CONNECTIONS_REACH,
  },
  {
    label: 'Private to me',
    value: PRIVATE_REACH,
  },
];

function CreateContentMetaScreen({ navigation }) {
  const [description, setDescription] = useState('');
  const [mentions, setMentions] = useState('');
  const [selectedReach, setSelectedReach] = useState(NETWORK_REACH);

  const isDisabled = (false);

  return (
    <SafeAreaView
      style={{flex: 1}}
      contentContainerStyle={{flex: 1}}
    >
      <CreateHeader
        heading="Details"
        canCancel={false}
        canBack={true}
        canNext={false}
        canPost={true}
        isNextOrPostDisabled={isDisabled}
        onNextOrPost={() => navigation.navigate('Feed')}
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
              minHeight={75}
              maxHeight={75}
              label="Additional description and hashtags"
              placeholder="Describe your post"
              value={description}
              onChange={setDescription}
              inputFooter={
                <Button
                  theme="tertiary"
                  size="small"
                  label="#hashtags"
                  buttonStyle={{
                    width: 110,
                  }}
                />
              }
            />
          </View>

          <View style={styles.row}>
            <TextInput
              multiline={true}
              minHeight={50}
              maxHeight={50}
              label="Request member feedback"
              placeholder="@mention"
              value={mentions}
              onChange={setMentions}
              inputFooter={
                <Button
                  theme="tertiary"
                  size="small"
                  label="@mentions"
                  buttonStyle={{
                    width: 110,
                  }}
                />
              }
            />
          </View>

          {/* <View style={styles.row}> */}
          {/*   <Picker */}
          {/*     label="Who can view" */}
          {/*     value={selectedReach} */}
          {/*     onChange={setSelectedReach} */}
          {/*     options={REACH_OPTIONS} */}
          {/*   /> */}
          {/* </View> */}
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

export default CreateContentMetaScreen;
