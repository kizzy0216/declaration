import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import Modal from '~/components/Modal';
import TextInput from '~/components/TextInput';

function ProfileProblemBioEditModal({
  user,
  isVisible = false,
  onClose = () => {},
  onSubmit = () => {},
}) {
  const [problemBio, setProblemBio] = useState(user.profile.problemBio || '');

  function handleSubmit() {
    onSubmit({
      problemBio,
    });
  }

  return (
    <Modal
      isVisible={isVisible}
      position="bottom"
      hasDragHandle={false}
      heading="I need help with"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <View style={styles.container}>
        <View style={styles.row}>
          <TextInput
            placeholder="Specific problem or need"
            multiline={true}
            minHeight={100}
            maxHeight={150}
            value={problemBio}
            onChange={setProblemBio}
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

export default ProfileProblemBioEditModal;
