import React from 'react';
import {
  StyleSheet,
  TextInput as RNTextInput,
  View,
  Text,
  Keyboard,
} from 'react-native';

import {
  LIGHT_GRAY,
  RED,
} from '~/constants';

function TextInput({
  label = '',
  error = '',
  placeholder,
  theme = 'primary', // primary, secondary
  onChange = () => {},
  value,
  ...props
}) {
  return (
    <View style={[styles.container, props.style]}>
      {label.length > 0 &&
        <Text style={styles.label}>
          {label}
        </Text>
      }

      <View style={[styles.textInputWrapper, styles[`${theme}TextInputWrapper`]]}>
        <RNTextInput
          {...props}
          placeholder={placeholder}
          style={[styles.textInput, props.textInputStyle]}
          onChangeText={onChange}
          value={value}
        />
      </View>

      {error.length > 0 &&
        <Text style={styles.error}>
          {error}
        </Text>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  },
  textInputWrapper: {
    borderRadius: 17,
    padding: 20,
  },
  primaryTextInputWrapper: {
    backgroundColor: LIGHT_GRAY,
  },
  secondaryTextInputWrapper: {
    backgroundColor: 'white',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  error: {
    color: RED,
    fontSize: 12,
    marginTop: 5,
  },
});

export default TextInput;
