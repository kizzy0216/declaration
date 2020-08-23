import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import Modal from '~/components/Modal';
import ScreenHeader from '~/components/ScreenHeader';

function ContentShareModal({
  item,
  isVisible,
  onClose = () => {},
}) {
  return (
    <Modal
      header={
        <ScreenHeader
          heading="12 Shares"
          onClose={onClose}
        />
      }
      isVisible={isVisible}
      onClose={onClose}
    >
    </Modal>
  );
}

export default ContentShareModal;
