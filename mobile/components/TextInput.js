import React from 'react';
import {
  StyleSheet,
  TextInput as RNTextInput,
  View,
  Text,
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
        <Text style={styles.label}>
          {label}
        </Text>
      }

      <View style={styles.textInputWrapper}>
        <RNTextInput
          {...props}
          placeholder={placeholder}
          style={[styles.textInput, props.textInputStyle]}
          onChangeText={onChange}
          value={value}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  },
  textInputWrapper: {
    borderRadius: 17,
    padding: 20,
    backgroundColor: Colors.lightGray,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default TextInput;
