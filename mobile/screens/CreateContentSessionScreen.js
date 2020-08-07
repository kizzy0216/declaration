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
import RadioGroup from '~/components/RadioGroup';
import CheckboxGroup from '~/components/CheckboxGroup';
import DateTimePickerGroup from '~/components/DateTimePickerGroup';

const DURATION_OPTIONS = [
  {
    label: '30 mins',
    value: '30_MINS',
  },
  {
    label: '60 mins',
    value: '60_MINS',
  },
];

const WEEK_DAY_OPTIONS = [
  {
    label: 'Mon',
    value: 'MONDAY',
  },
  {
    label: 'Tues',
    value: 'TUESDAY',
  },
  {
    label: 'Wed',
    value: 'WEDNESDAY',
  },
  {
    label: 'Thurs',
    value: 'THURSDAY',
  },
  {
    label: 'Fri',
    value: 'FRIDAY',
  },
  {
    label: 'Sat',
    value: 'SATURDAY',
  },
  {
    label: 'Sun',
    value: 'SUNDAY',
  },
];

function CreateContentSessionScreen({ navigation }) {
  const [heading, setHeading] = useState('');
  const [duration, setDuration] = useState(DURATION_OPTIONS[0].value);
  const [availableDays, setAvailableDays] = useState([]);
  const [
    timesAvailable,
    setTimesAvailable,
  ] = useState([
    new Date(new Date().setHours(9)).setMinutes(30),
    new Date(new Date().setHours(18)).setMinutes(0),
  ]);
  const isDisabled = (false);

  return (
    <SafeAreaView
      style={{flex: 1}}
      contentContainerStyle={{flex: 1}}
    >
      <CreateHeader
        heading="Add session"
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
              label="Session title"
              placeholder="Build a strong brand with social media"
              value={heading}
              onChange={setHeading}
            />
          </View>

          <View style={styles.row}>
            <RadioGroup
              label="Duration"
              options={DURATION_OPTIONS}
              value={duration}
              onChange={setDuration}
            />
          </View>

          <View style={styles.row}>
            <CheckboxGroup
              label="Available on"
              options={WEEK_DAY_OPTIONS}
              value={availableDays}
              onChange={setAvailableDays}
            />
          </View>

          <View style={styles.row}>
            <DateTimePickerGroup
              label="Available between"
              mode="time"
              values={timesAvailable}
              onChange={setTimesAvailable}
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

export default CreateContentSessionScreen;
