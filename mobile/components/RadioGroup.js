import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import {
  LIGHT_BLUE,
  LIGHT_GRAY,
} from '~/constants';

function RadioGroup({
  label = '',
  options = [],
  value = '',
  onChange = () => {},
}) {
  return (
    <View style={styles.radioGroup}>
      {label.length > 0 &&
        <Text style={styles.label}>
          {label}
        </Text>
      }

      <View style={styles.container}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => onChange(option.value)}
            style={styles.buttonWrapper}
            containerStyle={{
              overflow: 'visible',
              width: '50%',
            }}
          >
            <View
              style={[
                styles.button,
                (option.value === value) && styles.selected,
                index % 2 ? styles.odd : styles.even,
              ]}
            >
              <Text style={styles.buttonLabel}>
                {option.label}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 17,
    width: '100%',
    overflow: 'visible',
    backgroundColor: LIGHT_GRAY,
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  selected: {
    backgroundColor: LIGHT_BLUE,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  buttonWrapper: {
    marginBottom: 10,
  },
  buttonLabel: {
    textAlign: 'center',
  },
  even: {
    marginRight: 10,
  },
  odd: {
    marginLeft: 10,
  },
});

export default RadioGroup;
