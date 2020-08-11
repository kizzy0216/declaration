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
  onClose = () => {},
}) {
  return (
    <Modal
      isVisible={isVisible}
      onClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.row}>
          <Button
            label="Edit"
            theme="secondary"
          />
        </View>
        <View style={styles.row}>
          <Button
            label="Mute"
            theme="secondary"
          />
        </View>
        <View style={styles.row}>
          <Button
            label="Report Abuse"
            theme="secondary"
          />
        </View>
        <View style={styles.row}>
          <Button
            label="Delete"
            theme="danger"
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 30,
    paddingRight: 30,
  },
  row: {
    marginBottom: 10,
  },
});

export default ContentMenuModal;
