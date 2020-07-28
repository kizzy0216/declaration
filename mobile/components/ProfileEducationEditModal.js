import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import Modal from '~/components/Modal';
import TextInput from '~/components/TextInput';

function ProfileEducationEditModal({
  user,
  isVisible = false,
  isFetching = false,
  onClose = () => {},
  onSubmit = () => {},
}) {
  const [
    educationalInstitution,
    setEducationalInstitution,
  ] = useState(user.profile.educationalInstitution || '');

  function handleSubmit() {
    onSubmit({
      educationalInstitution,
    });
  }

  return (
    <Modal
      isVisible={isVisible}
      position="bottom"
      hasDragHandle={false}
      heading="Education"
      isFetching={isFetching}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <View style={styles.container}>
        <View style={styles.row}>
          <TextInput
            placeholder="Educational institution"
            value={educationalInstitution}
            onChange={setEducationalInstitution}
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

export default ProfileEducationEditModal;
