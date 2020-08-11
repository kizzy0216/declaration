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
import { BorderlessButton } from 'react-native-gesture-handler';
import Constants from 'expo-constants';

const { REST_BASE_URL } = Constants.manifest.extra;

import ScreenHeader from '~/components/ScreenHeader';
import NetworkSwitcherModal from '~/components/NetworkSwitcherModal';
import { NetworkContext } from '~/contexts/NetworkContext';
import { UserContext } from '~/contexts/UserContext';
import MessageIcon from '@shared/components/icons/MessageIcon';
import CalendarIcon from '@shared/components/icons/CalendarIcon';
import ChevronDownIcon from '@shared/components/icons/ChevronDownIcon';

function FeedHeader({
  theme = 'dark', // light or dark
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

      <ScreenHeader
        leftElement={(
          <BorderlessButton onPress={onCalendarPress}>
            <CalendarIcon
              width={22}
              height={22}
              fill={theme === 'light' ? 'white' : 'black'}
            />
          </BorderlessButton>
        )}
        headingElement={(
          <TouchableOpacity
            onPress={() => setIsModalVisible(true)}
          >
            <View style={styles.nameWrapper}>
              <Text
                style={{
                  ...styles.name,
                  color: (theme === 'light' ? 'white' : 'black'),
                }}
              >
                {activeNetwork && activeNetwork.name}
              </Text>
              <View style={styles.chevronIconWrapper}>
                <ChevronDownIcon
                  width={16}
                  height={16}
                  fill={theme === 'light' ? 'white' : 'black'}
                />
              </View>
            </View>
          </TouchableOpacity>
        )}
        rightElement={(
          <BorderlessButton onPress={onMessagesPress}>
            <MessageIcon
              width={22}
              height={22}
              fill={theme === 'light' ? 'white' : 'black'}
            />
          </BorderlessButton>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  nameWrapper: {
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontWeight: 'bold',
  },
  chevronIconWrapper: {
    marginLeft: 5,
  },
});

export default FeedHeader;
