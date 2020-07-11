import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import TextInput from '~/components/TextInput';
import Button from '~/components/Button';

function NetworkMembershipRequestForm({
  onSubmit = () => {},
}) {
  const [body, setBody] = useState('');

  function handleSubmit() {
    onSubmit({ body });
  }

  return (
    <View>
      <View style={styles.row}>
        <TextInput
          label="Invitation request"
          multiline={true}
          value={body}
          onChange={setBody}
          minHeight={100}
          maxHeight={200}
        />
      </View>

      <Button
        label="Send"
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

export default NetworkMembershipRequestForm;
