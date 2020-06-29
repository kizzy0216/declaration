import React from 'react';
import {
  StyleSheet,
  TextInput as RNTextInput,
  View,
} from 'react-native';

import Colors from '~/constants/Colors';

function TextInput({
  label,
  placeholder,
  onChange = () => {},
  value,
  ...props
}) {
  return (
    <View style={[styles.container, props.style]}>
      {label &&
        <Text>
          {label}
        </Text>
      }
      <RNTextInput
        {...props}
        placeholder={placeholder}
        style={[styles.textInput, props.textInputStyle]}
        onChange={onChange}
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  },
  textInput: {
    borderRadius: 17,
    padding: 20,
    backgroundColor: Colors.lightGray,
  },
});

export default TextInput;
