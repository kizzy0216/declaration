import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Modal from '~/components/Modal';
import SelectableList from '~/components/SelectableList';
import SelectableListItem from '~/components/SelectableListItem';
import PlusIcon from 'Shared/components/icons/PlusIcon';
import Avatar from '~/components/Avatar';

function NetworkSwitcherModal({
  activeItem,
  items = [],
  isVisible = false,
  onNetworkAdd = () => {},
  onNetworkCreate = () => {},
  onClose = () => {},
}) {
  return (
    <Modal
      isVisible={isVisible}
      position="top"
      onClose={onClose}
    >
      <SelectableList
        initialSelectedItem={(
          activeItem
            ? {
              key: activeItem.uuid,
              heading: activeItem.label,
            }
            : {}
        )}
        items={items.map((item) => ({
          key: item.uuid,
          heading: item.label,
          image: (
            <Avatar
              name={item.label}
              imageSrc={item.imageSrc}
            />
          ),
          onSelect: item.onPress,
        }))}
      />
      <SelectableListItem
        heading="Add Network"
        image={(
          <View style={styles.plusIconWrapper}>
            <PlusIcon
              width={24}
              height={24}
              fill="black"
            />
          </View>
        )}
        action={<></>}
        onPress={onNetworkAdd}
      />
      <SelectableListItem
        heading="Create Network"
        image={(
          <View style={styles.plusIconWrapper}>
            <PlusIcon
              width={24}
              height={24}
              fill="black"
            />
          </View>
        )}
        action={<></>}
        onPress={onNetworkCreate}
      />
    </Modal>
  );
}

const styles = StyleSheet.create({
  plusIconWrapper: {
    paddingTop: 10,
    paddingRight: 20,
    paddingBottom: 10,
    paddingLeft: 10,
  },
});

export default NetworkSwitcherModal;
