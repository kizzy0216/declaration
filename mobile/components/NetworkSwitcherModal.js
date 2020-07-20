import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';

import SelectableList from '~/components/SelectableList';
import SelectableListItem from '~/components/SelectableListItem';
import PlusIcon from 'Shared/components/icons/PlusIcon';
import Avatar from '~/components/Avatar';
import DragHandle from '~/components/DragHandle';

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
      swipeDirection={['up']}
      style={styles.modal}
      animationIn="slideInDown"
      animationOut="slideOutUp"
      backdropOpacity={0.40}
      onSwipeComplete={onClose}
      onBackdropPress={onClose}
    >
      <SafeAreaView style={styles.container}>
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

        <View style={styles.dragHandleWrapper}>
          <DragHandle width={50} />
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-start',
    margin: 0,
  },
  container: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  plusIconWrapper: {
    paddingTop: 10,
    paddingRight: 20,
    paddingBottom: 10,
    paddingLeft: 10,
  },
  dragHandleWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 10,
  },
});

export default NetworkSwitcherModal;
