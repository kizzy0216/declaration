import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

import { BorderlessButton } from 'react-native-gesture-handler';
import { NetworkContext } from '~/contexts/NetworkContext';
import { UserContext } from '~/contexts/UserContext';

function FeedHeader({
  onCalendarPress = () => {},
  onMessagesPress = () => {},
}) {
  const { activeNetwork } = useContext(NetworkContext);
  const { user } = useContext(UserContext);

  function handleNamePress() {
  }

  return (
    <View style={styles.container}>
      <View style={styles.leftIconWrapper}>
        <BorderlessButton onPress={onCalendarPress}>
          <Ionicons
            name="md-calendar"
            size={22}
          />
        </BorderlessButton>
      </View>

      <View style={styles.usernameWrapper}>
        <TouchableOpacity onPress={handleNamePress}>
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
