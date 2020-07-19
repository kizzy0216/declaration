import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { BorderlessButton } from 'react-native-gesture-handler';

function ScreenHeader({
  onClose = () => {},
  heading,
  rightElement,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.headingWrapper}>
        <Text style={styles.heading}>
          {heading}
        </Text>
      </View>

      <View style={styles.iconWrapper}>
        {rightElement ? (
          rightElement
        ) : (
          <BorderlessButton
            onPress={onClose}
          >
            <Ionicons
              name="md-close"
              size={22}
            />
          </BorderlessButton>
        )}
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
    paddingTop: 10,
    paddingBottom: 10,
  },
  headingWrapper: {
    flex: 1,
  },
  heading: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  iconWrapper: {
    position: 'absolute',
    right: 20,
  },
});

export default ScreenHeader;
