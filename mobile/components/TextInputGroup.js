import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import TextInput from '~/components/TextInput';
import { LIGHT_GRAY, RED } from '~/constants';

function TextInputGroup({
  label = '',
  options = [],
  maxLength = "40",
  error = '',
  renderPreInput = () => null,
  renderLabel = () => '',
  renderPlaceholder = (option, index) => `Enter option ${index + 1}`,
  onChange = () => {},
}) {
  return (
    <View style={styles.inputGroup}>
      {label.length > 0 &&
        <Text style={styles.inputGroupLabel}>
          {label}
        </Text>
      }

      <View style={styles.container}>
        {options.map((option, index) => (
          <View
            style={styles.inputRow}
            key={index}
          >
            {renderPreInput(option, index)}

            <View style={styles.inputWrapper}>
              <TextInput
                label={renderLabel(option, index)}
                placeholder={renderPlaceholder(option, index)}
                value={option}
                theme="secondary"
                onChange={(updatedOption) =>
                  onChange(
                    options.map((currentOption, currentIndex) => (
                      currentIndex === index
                      ? updatedOption
                      : currentOption
                    ))
                  )
                }
                maxLength={maxLength}
              />
            </View>
          </View>
        ))}

        {error.length > 0 &&
          <Text style={styles.error}>
            {error}
          </Text>
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputGroupLabel: {
    fontWeight: 'bold',
  },
  container: {
    backgroundColor: LIGHT_GRAY,
    borderRadius: 22,
    paddingTop: 20,
    paddingRight: 30,
    paddingBottom: 20,
    paddingLeft: 30,
  },
  inputGroupLabel: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  inputRowLabel: {
    paddingRight: 10,
  },
  inputWrapper: {
    flexGrow: 1,
  },
  error: {
    color: RED,
    fontSize: 12,
    marginTop: 5,
  },
});

export default TextInputGroup;
