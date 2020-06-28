import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { RectButton, BorderlessButton } from 'react-native-gesture-handler';

import Colors from '~/constants/Colors';

function Button({
  label,
  theme = 'primary',
  onPress = () => {},
}) {
  const inner = (
    <View
      accessible
      style={styles.container}
    >
      <View style={styles.labelWrapper}>
        <Text style={styles.label}>{label}</Text>
      </View>
    </View>
  );

  if (theme === 'transparent') {
    return (
      <BorderlessButton onPress={onPress}>
        {inner}
      </BorderlessButton>
    );
  }

  return (
    <RectButton
      onPress={onPress}
      style={[styles.button, styles[theme]]}
    >
      {inner}
    </RectButton>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 17,
  },
  primary: {
    backgroundColor: Colors.blue,
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  container: {
    width: '100%',
    flexDirection: 'row',
  },
  labelWrapper: {
    flex: 1,
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
  },
  label: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Button;
