import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { GRAY } from '~/constants';
import EmptySetIcon from 'Shared/components/icons/EmptySetIcon';

function EmptyState({
  heading,
  icon = (
    <EmptySetIcon
      width={64}
      height={64}
      fill={GRAY}
    />
  ),
}) {
  return (
    <View style={styles.emptyState}>
      <View style={styles.iconWrapper}>
        {icon}
      </View>

      <Text style={styles.heading}>
        {heading}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyState: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    marginBottom: 25,
  },
  heading: {
    fontWeight: 'bold',
    color: GRAY,
  },
});

export default EmptyState;
