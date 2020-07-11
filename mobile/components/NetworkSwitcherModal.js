import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '~/components/Button';

function NetworkSwitcherModal({
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
    >
      <SafeAreaView style={styles.container}>
        <ScrollView>
          {items.map((item) => (
            <Button
              key={item.uuid}
              label={item.label}
              onPress={item.onPress}
              theme={item.isActive ? 'primary' : 'secondary'}
            />
          ))}
          <Button
            label="Add Network"
            theme="transparent"
            onPress={onNetworkAdd}
          />
          <Button
            label="Create Network"
            theme="transparent"
            onPress={onNetworkCreate}
          />
        </ScrollView>
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
    paddingBottom: 40,
  }
});

export default NetworkSwitcherModal;
