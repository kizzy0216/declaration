import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import Modal from '~/components/Modal';
import TextInput from '~/components/TextInput';

function ProfileLocationEditModal({
  user,
  isVisible = false,
  onClose = () => {},
  onSubmit = () => {},
}) {
  const [location, setLocation] = useState(user.profile.location || '');

  function handleSubmit() {
    onSubmit({
      location,
    });
  }

  return (
    <Modal
      isVisible={isVisible}
      position="bottom"
      hasDragHandle={false}
      heading="Location"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <View style={styles.container}>
        <View style={styles.row}>
          <TextInput
            placeholder="City, State"
            value={location}
            onChange={setLocation}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingLeft: 30,
    paddingRight: 30,
  },
  row: {
    marginBottom: 20,
  },
});

export default ProfileLocationEditModal;
