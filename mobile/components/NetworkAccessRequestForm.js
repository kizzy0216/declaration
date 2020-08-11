import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import TextInput from '~/components/TextInput';
import Button from '~/components/Button';
import Picker from '~/components/Picker';
import {
  NETWORK_ACCESS_REQUEST_COUNT_USERS_OPTIONS
} from '@shared/constants/index.js';

const userCountRangeOptions = [
  {
    label: 'Number of expected users',
    value: '',
  },
  ...NETWORK_ACCESS_REQUEST_COUNT_USERS_OPTIONS,
];

function NetworkAccessRequestForm({
  isFetching = false,
  onSubmit = () => {},
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [communityName, setCommunityName] = useState('');
  const [
    userCountRange, 
    setUserCountRange,
  ] = useState(userCountRangeOptions[0].value);
  const [body, setBody] = useState('');

  function handleSubmit() {
    onSubmit({
      name,
      email,
      communityName,
      userCountRange,
      body,
    });
  }

  return (
    <View>
      <View style={styles.row}>
        <TextInput
          label="Name"
          placeholder="Enter your name"
          value={name}
          onChange={setName}
        />
      </View>

      <View style={styles.row}>
        <TextInput
          label="Email"
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCompleteType="email"
          value={email}
          onChange={setEmail}
        />
      </View>

      <View style={styles.row}>
        <TextInput
          label="Company/School/Institution"
          placeholder="Enter your official name"
          value={communityName}
          onChange={setCommunityName}
        />
      </View>

      <View style={styles.row}>
        <Picker
          label="Total Members"
          value={userCountRange}
          options={userCountRangeOptions}
          onChange={setUserCountRange}
        />
      </View>

      <View style={styles.row}>
        <TextInput
          label="Additional comments"
          multiline={true}
          value={body}
          onChange={setBody}
          minHeight={50}
          maxHeight={150}
        />
      </View>

      <Button
        label="Send"
        isFetching={isFetching}
        onPress={handleSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    marginBottom: 20,
  },
});

export default NetworkAccessRequestForm;
