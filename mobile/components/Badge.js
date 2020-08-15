import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

function Badge({
  label,
  width = 18,
  height = 18,
  labelStyle,
  style,
}) {
  return (
    <View
      style={{
        ...styles.badge,
        width,
        height,
        borderRadius: (width / 2),
        ...style,
      }}
    >
      <Text
        style={[
          styles.label,
          labelStyle,
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: 'white',
    fontSize: 10,
    lineHeight: 12,
    fontWeight: 'bold',
  },
});

export default Badge;
