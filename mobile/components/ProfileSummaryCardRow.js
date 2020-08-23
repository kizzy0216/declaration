import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

function ProfileSummaryCardRow({
  icon,
  label,
  fallbackLabel,
  isEditable = false,
  onPress = () => {},
}) {
  const hasLabel = (label && label.length > 0);

  const rowElement = (
    <View style={styles.row}>
      <View style={styles.icon}>
        {icon}
      </View>
      <Text style={styles.label}>
        {hasLabel ? label : fallbackLabel}
      </Text>
    </View>
  );

  if (isEditable) {
    return (
      <TouchableOpacity onPress={onPress}>
        {rowElement}
      </TouchableOpacity>
    );
  }

  return rowElement;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 20,
    paddingBottom: 20,
  },
  label: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 14,
  },
});

export default ProfileSummaryCardRow;
