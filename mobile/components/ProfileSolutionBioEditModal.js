import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import Modal from '~/components/Modal';
import TextInput from '~/components/TextInput';

function ProfileSolutionBioEditModal({
  user,
  isVisible = false,
  onClose = () => {},
  onSubmit = () => {},
}) {
  const [solutionBio, setSolutionBio] = useState(user.profile.solutionBio || '');

  function handleSubmit() {
    onSubmit({
      solutionBio,
    });
  }

  return (
    <Modal
      isVisible={isVisible}
      position="bottom"
      hasDragHandle={false}
      heading="I can help by"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <View style={styles.container}>
        <View style={styles.row}>
          <TextInput
            placeholder="Specific solution or skillset"
            multiline={true}
            minHeight={100}
            maxHeight={150}
            value={solutionBio}
            onChange={setSolutionBio}
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

export default ProfileSolutionBioEditModal;
