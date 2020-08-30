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

const TextInput = React.forwardRef(({
  label = '',
  error = '',
  placeholder,
  theme = 'primary', // primary, secondary
  inputFooter,
  onChange = () => {},
  value,
  ...props
}, ref) => {
  return (
    <View style={[styles.container, props.style]}>
      {label.length > 0 &&
        <Text style={styles.label}>
          {label}
        </Text>
      }

      <View
        style={[
          styles.textInputWrapper,
          styles[`${theme}TextInputWrapper`],
        ]}
      >
        <RNTextInput
          {...props}
          ref={ref}
          placeholder={placeholder}
          style={[styles.textInput, props.textInputStyle]}
          onChangeText={onChange}
          value={value}
        />

        {inputFooter &&
          <View style={styles.inputFooterWrapper}>
            {inputFooter}
          </View>
        }
      </View>

      {error.length > 0 &&
        <Text style={styles.error}>
          {error}
        </Text>
      }
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
  },
  textInput: {
    fontSize: 14,
    lineHeight: 20,
  },
  textInputWrapper: {
    borderRadius: 17,
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 23,
    paddingLeft: 20,
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
    fontSize: 14,
  },
  error: {
    color: RED,
    fontSize: 12,
    marginTop: 5,
  },
  inputFooterWrapper: {
    marginTop: 10,
  },
});

export default TextInput;
