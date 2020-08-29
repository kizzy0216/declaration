import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import Modal from '~/components/Modal';
import Button from '~/components/Button';

function ContentMenuModal({
  content,
  isVisible,
  canDelete,
  onClose = () => {},
  onDelete = () => {},
}) {
  return (
    <Modal
      isVisible={isVisible}
      onClose={onClose}
    >
      <View style={styles.container}>
        {canDelete &&
          <View style={styles.row}>
            <Button
              label="Delete"
              theme="danger"
              onPress={onDelete}
            />
          </View>
        }
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 30,
  },
  row: {
    marginBottom: 10,
  },
});

export default ContentMenuModal;
