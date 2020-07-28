import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import Modal from '~/components/Modal';
import TextInput from '~/components/TextInput';

function ProfileWorkEditModal({
  user,
  isVisible = false,
  isFetching = false,
  onClose = () => {},
  onSubmit = () => {},
}) {
  const [
    workPlace,
    setWorkPlace,
  ] = useState(user.profile.workPlace || '');
  const [
    workTitle,
    setWorkTitle,
  ] = useState(user.profile.workTitle || '');

  function handleSubmit() {
    onSubmit({
      workPlace,
      workTitle,
    });
  }

  return (
    <Modal
      isVisible={isVisible}
      position="bottom"
      hasDragHandle={false}
      heading="Work"
      isFetching={isFetching}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <View style={styles.container}>
        <View style={styles.row}>
          <TextInput
            label="Work title"
            placeholder="Designer, student, etc"
            value={workTitle}
            onChange={setWorkTitle}
          />
        </View>
        <View style={styles.row}>
          <TextInput
            label="Work place"
            placeholder="Company name"
            value={workPlace}
            onChange={setWorkPlace}
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

export default ProfileWorkEditModal;
