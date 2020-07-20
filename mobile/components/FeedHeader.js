import React, {
  useState,
  useContext,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';
import Constants from 'expo-constants';

const { REST_BASE_URL } = Constants.manifest.extra;

import NetworkSwitcherModal from '~/components/NetworkSwitcherModal';
import { NetworkContext } from '~/contexts/NetworkContext';
import { UserContext } from '~/contexts/UserContext';

function FeedHeader({
  onNetworkAdd = () => {},
  onNetworkCreate = () => {},
  onCalendarPress = () => {},
  onMessagesPress = () => {},
}) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {
    activeNetwork,
    networks,
    setActiveNetwork,
  } = useContext(NetworkContext);
  const { user } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <NetworkSwitcherModal
        isVisible={isModalVisible}
        activeItem={activeNetwork}
        items={
          networks.map((network) => ({
            uuid: network.uuid,
            label: network.name,
            imageSrc: `${REST_BASE_URL}/avatar/${network.uuid}`,
            onPress: () => {
              setActiveNetwork(network);
              setIsModalVisible(false);
            },
          }))
        }
        onClose={() => setIsModalVisible(false)}
        onNetworkAdd={() => {
          setIsModalVisible(false);
          onNetworkAdd();
        }}
        onNetworkCreate={() => {
          setIsModalVisible(false);
          onNetworkCreate();
        }}
      />

      <View style={styles.leftIconWrapper}>
        <BorderlessButton onPress={onCalendarPress}>
          <Ionicons
            name="md-calendar"
            size={22}
          />
        </BorderlessButton>
      </View>

      <View style={styles.usernameWrapper}>
        <TouchableOpacity
          onPress={() => setIsModalVisible(true)}
        >
          <View style={styles.username}>
            <Text>
              {activeNetwork && activeNetwork.name}
            </Text>
            <Feather
              name="chevron-down"
              size={16}
            />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.rightIconWrapper}>
        <BorderlessButton onPress={onMessagesPress}>
          <Ionicons
            name="md-paper-plane"
            size={22}
          />
        </BorderlessButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  usernameWrapper: {
    flex: 1,
    paddingLeft: 60,
    paddingRight: 60,
  },
  username: {
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chevronWrapper: {
    marginLeft: 10,
  },
  leftIconWrapper: {
    position: 'absolute',
    left: 20,
    zIndex: 1,
  },
  rightIconWrapper: {
    position: 'absolute',
    right: 20,
    zIndex: 1,
  },
});

export default FeedHeader;
