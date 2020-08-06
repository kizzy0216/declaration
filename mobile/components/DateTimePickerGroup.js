import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import DateTimePicker from '~/components/DateTimePicker';

function DateTimePickerGroup({
  label = '',
  mode = 'date', // date or time
  values = [],
  renderLabel = () => '',
  onChange = () => {},
}) {
  return (
    <View style={styles.dateTimePickerGroup}>
      {label.length > 0 &&
        <Text style={styles.label}>
          {label}
        </Text>
      }

      <View style={styles.container}>
        {values.map((value, index) => (
          <View
            style={styles.pickerContainer}
            key={index}
          >
            <View
              style={[
                styles.pickerWrapper,
                index % 2 ? styles.even : styles.odd,
              ]}
            >
              <DateTimePicker
                label={renderLabel(value, index)}
                mode={mode}
                value={value}
                onChange={(updatedValue) =>
                  onChange(
                    values.map((currentValue, currentIndex) => (
                      currentIndex === index
                      ? updatedValue
                      : currentValue
                    ))
                  )
                }
              />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    width: '100%',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  pickerContainer: {
    width: '50%',
  },
  pickerWrapper: {
  },
  even: {
    marginLeft: 5,
  },
  odd: {
    marginRight: 5,
  },
});

export default DateTimePickerGroup;
