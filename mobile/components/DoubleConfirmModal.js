import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import Button from '~/components/Button';
import Modal from '~/components/Modal';
import Paragraph from '~/components/Paragraph';

function DoubleConfirmModal({
  heading = 'Are you sure?',
  subHeading = '',
  submitLabel = 'Yes, do it',
  cancelLabel = 'No, cancel',
  isFetching = false,
  isVisible = false,
  onSubmit = () => {},
  onCancel = () => {},
}) {
  return (
    <Modal
      position="bottom"
      isFetching={isFetching}
      isVisible={isVisible}
      onClose={onCancel}
    >
      <View style={styles.container}>
        <Paragraph
          style={styles.heading}
          size="large"
        >
          {heading}
        </Paragraph>

        {subHeading.length > 0 &&
          <Paragraph
            style={styles.subHeading}
            size="small"
          >
            {subHeading}
          </Paragraph>
        }

        <View style={styles.row}>
          <Button
            theme="secondary"
            label={cancelLabel}
            onPress={onCancel}
          />
        </View>

        <Button
          theme="primary"
          label={submitLabel}
          onPress={onSubmit}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 30,
    paddingRight: 30,
  },
  heading: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  subHeading: {
    textAlign: 'center',
  },
  row: {
    marginTop: 40,
    marginBottom: 10,
  },
});

export default DoubleConfirmModal;
