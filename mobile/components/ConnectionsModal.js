import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import Modal from '~/components/Modal';
import Avatar from '~/components/Avatar';
import MultiSelectableList from '~/components/MultiSelectableList';
import { WINDOW_HEIGHT } from '~/constants';

function ConnectionsModal({
  items,
  initialSelected = [],
  isFetching = false,
  isVisible = false,
  onClose = () => {},
  onSelect = () => {},
  onSubmit = () => {},
}) {
  return (
    <Modal
      heading="@connections"
      isFetching={isFetching}
      isVisible={isVisible}
      onSubmit={onSubmit}
      onClose={onClose}
    >
      <View style={styles.mentionsModal}>
        <MultiSelectableList
          initialSelected={initialSelected}
          items={items.map((item) => ({
            key: item.uuid,
            heading: item.name,
            subHeading: item.profile.username,
            image: (
              <Avatar
                name={item.name}
                imageSrc={item.profile.photo}
              />
            ),
          }))}
          onSelect={onSelect}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  mentionsModal: {
    height: WINDOW_HEIGHT * 0.75,
    paddingBottom: 30,
  },
});

export default ConnectionsModal;
