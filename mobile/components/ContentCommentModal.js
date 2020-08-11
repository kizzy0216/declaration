import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import Modal from '~/components/Modal';
import ScreenHeader from '~/components/ScreenHeader';

function ContentCommentModal({
  content,
  isVisible,
  onClose = () => {},
}) {
  return (
    <Modal
      header={
        <ScreenHeader
          heading="137 Comments"
          onClose={onClose}
        />
      }
      isVisible={isVisible}
      onClose={onClose}
    >
      <Text>Comments</Text>
      <Text>{content.id}</Text>
    </Modal>
  );
}

export default ContentCommentModal;
