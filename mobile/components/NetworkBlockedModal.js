import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NetworkContext } from '~/contexts/NetworkContext';
import { UserContext } from '~/contexts/UserContext';

import Button from '~/components/Button';

function NetworkBlockedModal() {
  const [isVisible, setIsVisible] = useState(false);

  const { activeNetwork } = useContext(NetworkContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (
      user &&
      activeNetwork &&
      user.isBlockedByNetworkUuid &&
      user.isBlockedByNetworkUuid[activeNetwork.uuid]
    ) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [user, activeNetwork]);

  return (
    <Modal
      isVisible={isVisible}
      swipeDirection={['up']}
      style={styles.modal}
      animationIn="slideInDown"
      animationOut="slideOutUp"
      backdropOpacity={0.40}
      onSwipeComplete={() => setIsVisible(false)}
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.heading}>
          You're blocked from {activeNetwork.name}.
        </Text>

        <Text style={styles.subHeading}>
          Interactions with members of this network are disabled.
        </Text>

        <Button
          label="I understand"
          theme="secondary"
          onPress={() => setIsVisible(false)}
        />
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
    paddingRight: 20,
    paddingLeft: 20,
  },
  heading: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
    fontWeight: 'bold',
  },
  subHeading: {
    width: 250,
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 40,
  },
});

export default NetworkBlockedModal;
