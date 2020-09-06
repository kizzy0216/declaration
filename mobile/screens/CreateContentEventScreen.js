import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import LocationInputContainer from '~/containers/LocationInputContainer';
import CreateHeader from '~/components/CreateHeader';
import { IS_IOS } from '~/constants';
import TextInput from '~/components/TextInput';
import DateTimePicker from '~/components/DateTimePicker';

function CreateContentEventScreen({ navigation }) {
  const [heading, setHeading] = useState('');
  const [body, setBody] = useState('');
  const [
    dateStart,
    setDateStart,
  ] = useState();
  const [
    dateEnd,
    setDateEnd,
  ] = useState();
  const [physicalLocation, setPhysicalLocation] = useState({
    location: '',
    place: {},
    isFetching: false,
    isInvalid: false,
  });
  const [virtualLocation, setVirtualLocation] = useState('');

  const isDisabled = (
    physicalLocation.location.length > 0 &&
    physicalLocation.isInvalid
  );

  return (
    <SafeAreaView
      style={{flex: 1}}
      edges={['top','left','right']}
      contentContainerStyle={{flex: 1}}
    >
      <CreateHeader
        heading="Add details"
        canCancel={true}
        canBack={false}
        canNext={true}
        canPost={false}
        isNextOrPostDisabled={isDisabled}
        isFetching={physicalLocation.isFetching}
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
            <TextInput
              label="Event description"
              placeholder="Add an event description that will take no longer than 1 min to read."
              value={body}
              onChange={setBody}
              multiline={true}
              minHeight={100}
              maxHeight={100}
            />
          </View>

          <View style={styles.closeRow}>
            <DateTimePicker
              label="Starts"
              placeholder="Start date"
              mode="date"
              value={dateStart}
              onChange={setDateStart}
            />
          </View>
          <View style={styles.row}>
            <DateTimePicker
              placeholder="Start time"
              mode="time"
              value={dateStart}
              onChange={setDateStart}
            />
          </View>

          <View style={styles.closeRow}>
            <DateTimePicker
              label="Ends"
              placeholder="End date"
              mode="date"
              value={dateEnd}
              onChange={setDateEnd}
            />
          </View>
          <View style={styles.row}>
            <DateTimePicker
              placeholder="End time"
              mode="time"
              value={dateEnd}
              onChange={setDateEnd}
            />
          </View>

          <View style={styles.closeRow}>
            <TextInput
              label="Location"
              placeholder="https://..."
              value={virtualLocation}
              onChange={setVirtualLocation}
            />
          </View>
          <View style={styles.row}>
            <LocationInputContainer
              placeholder="Search for a venue or address"
              onChange={setPhysicalLocation}
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
  closeRow: {
    marginBottom: 10,
  },
  row: {
    marginBottom: 30,
  },
});

export default CreateContentEventScreen;
