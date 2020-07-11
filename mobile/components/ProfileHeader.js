import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { BorderlessButton } from 'react-native-gesture-handler';
import { UserContext } from '~/contexts/UserContext';

function ProfileHeader({
  onSettingsPress = () => {},
}) {
  const { user } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <View style={styles.usernameWrapper}>
        <Text style={styles.username}>{user.email}</Text>
      </View>

      <View style={styles.iconWrapper}>
        <BorderlessButton
          onPress={onSettingsPress}
        >
          <Ionicons
            name="md-settings"
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
  },
  username: {
    textAlign: 'center',
  },
  iconWrapper: {
    position: 'absolute',
    right: 20,
  },
});

export default ProfileHeader;
