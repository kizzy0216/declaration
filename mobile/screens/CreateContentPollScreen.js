import React, {
  useEffect,
  useContext,
} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

import { CreateContentContext } from '~/contexts/CreateContentContext';
import CreateHeader from '~/components/CreateHeader';
import TextInput from '~/components/TextInput';
import TextInputGroup from '~/components/TextInputGroup';
import Badge from '~/components/Badge';
import {
  LIGHT_GRAY,
  IS_IOS,
} from '~/constants';

const BADGE_LABELS = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
];

function CreateContentPoll({ navigation, route }) {
  const {
    withMedia,
    countOptions = 2,
  } = route.params || {};
  const {
    heading,
    setHeading,
    poll,
    setPoll,
    setType,
  } = useContext(CreateContentContext);

  const isDisabled = (
    heading === ''
  );

  useFocusEffect(() => {
    if (poll.options.length === 0) {
      setPoll({
        ...poll,
        options: [...new Array(countOptions)].map(() => ''),
      });
    } else if (poll.options.length > countOptions) {
      setPoll({
        ...poll,
        options: poll.options.slice(0, countOptions),
      });
    } else if (poll.options.length < countOptions) {
      setPoll({
        ...poll,
        options: [
          ...poll.options,
          ...[...new Array(countOptions - poll.options.length)].map(() => ''),
        ],
      });
    }
  });

  useEffect(() => {
    if (
      poll.options.length === 2 &&
      poll.options[0].length === 0 &&
      poll.options[1].length === 0
    ) {
      setPoll({
        ...poll,
        options: [
          'Yes',
          'No',
        ],
      });
    }
  }, [poll.options]);

  return (
    <SafeAreaView
      style={{flex: 1}}
      contentContainerStyle={{flex: 1}}
    >
      <CreateHeader
        heading="Add text"
        canCancel={true}
        canBack={false}
        canNext={true}
        canPost={false}
        isNextOrPostDisabled={isDisabled}
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
              minHeight={80}
              maxHeight={100}
              label="Add your question or idea"
              placeholder="Be specific with your idea or question"
              value={heading}
              onChange={setHeading}
            />
          </View>

          {poll.options.length > 0 &&
            <View style={styles.row}>
              <TextInputGroup
                label="Poll options"
                options={poll.options}
                renderPreInput={(_, index) => (
                  <View style={{marginRight: 20}}>
                    <Badge label={BADGE_LABELS[index]} />
                  </View>
                )}
                onChange={options => setPoll({ ...poll, options })}
              />
            </View>
          }
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

export default CreateContentPoll;
