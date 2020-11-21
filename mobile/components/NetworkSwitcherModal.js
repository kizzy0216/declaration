import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Modal from '~/components/Modal';
import SelectableList from '~/components/SelectableList';
import SelectableListItem from '~/components/SelectableListItem';
import PlusIcon from '@shared/components/icons/PlusIcon';
import Avatar from '~/components/Avatar';
import Button from './Button';

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
              width={20}
              height={20}
              fill="black"
            />
          </View>
        )}
        action={<></>}
        onPress={onNetworkAdd}
      />
      {/* <SelectableListItem
        heading="Create Network"
        image={(
          <View style={styles.plusIconWrapper}>
            <PlusIcon
              width={20}
              height={20}
              fill="black"
            />
          </View>
        )}
        action={<></>}
        onPress={onNetworkCreate}
      /> */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingTop: 30,
      }}>
        <TouchableOpacity
          disabled
          style={styles.button}
        >
          <Text style={{...styles.label, opacity: 0.65}}>Invite others to join</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={onNetworkCreate}
        >
          <Text style={styles.label}>Create a network</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  plusIconWrapper: {
    paddingTop: 10,
    paddingRight: 15,
    paddingBottom: 10,
    paddingLeft: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 30,
    elevation: 20,
    borderRadius: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#222'
  }
});

export default NetworkSwitcherModal;
