import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import Button from '~/components/Button';
import Modal from '~/components/Modal';
import Paragraph from '~/components/Paragraph';

function ChoiceModal({
  heading = 'Do you want to accept this?',
  subHeading = '',
  acceptLabel = 'Yes, I accept',
  declineLabel = 'No, I decline',
  isFetching = false,
  isVisible = false,
  onAccept = () => {},
  onDecline = () => {},
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
        <Paragraph style={styles.heading}>
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
            label={declineLabel}
            onPress={onDecline}
          />
        </View>

        <Button
          theme="primary"
          label={acceptLabel}
          onPress={onAccept}
        />
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

export default ChoiceModal;
