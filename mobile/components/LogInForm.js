import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import TextInput from '~/components/TextInput';
import Button from '~/components/Button';

function LogInForm({
  onSubmit = () => {},
}) {
  const [email, setEmail] = useState('');

  function handleSubmit() {
    if (email.length > 0) {
      onSubmit({ email });
    }
  }

  return (
    <View>
      <View style={styles.row}>
        <TextInput
          placeholder="Enter your email address"
          keyboardType="email-address"
          value={email}
          autoCapitalize="none"
          autoCompleteType="email"
          returnKeyType="done"
          onChange={setEmail}
        />
      </View>

      <Button
        label="Verify"
        onPress={handleSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    marginBottom: 10,
  },
});

export default LogInForm;