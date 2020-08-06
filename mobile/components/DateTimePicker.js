import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Platform,
} from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';

import Button from '~/components/Button';
import {
  LIGHT_GRAY,
  GRAY,
  RED,
} from '~/constants';
import {
  formatDate,
  formatTime,
} from 'Shared/utils/formatDate';

function DateTimePicker({
  label = '',
  value,
  error = '',
  placeholder,
  mode, // date or time
  onChange = () => {},
  ...props
}) {
  const [isActive, setIsActive] = useState(false);
  const [hasSelected, setHasSelected] = useState(!!value);

  function handleChange(_, datetime) {
    if (!hasSelected) {
      setHasSelected(true);
    }

    onChange(datetime);
  }

  const element = (
    <RNDateTimePicker
      mode={mode}
      style={styles.rnDateTimePicker}
      value={value || new Date()}
      display="default"
      onChange={handleChange}
    />
  );

  const buttonLabel = (
    hasSelected
    ? mode === 'date'
    ? formatDate(value)
    : formatTime(value)
    : placeholder
  );

  return (
    <View style={[styles.container, props.style]}>
      {label.length > 0 &&
        <Text style={styles.label}>
          {label}
        </Text>
      }

      {Platform.OS === 'android' &&
        <View style={styles.androidWrapper}>
          {element}
        </View>
      }

      {Platform.OS === 'ios' &&
        <View style={[styles.iosWrapper, isActive && styles.active]}>
          <Button
            label={buttonLabel}
            onPress={() => setIsActive(!isActive)}
            theme="secondary"
            labelWrapperStyle={styles.labelWrapperStyle}
            labelStyle={[styles.buttonLabelStyle, hasSelected && styles.buttonLabelStyleSelected]}
          />

          {isActive && element}
        </View>
      }

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
  rnDateTimePicker: {
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  androidWrapper: {
    borderRadius: 17,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    backgroundColor: LIGHT_GRAY,
  },
  iosWrapper: {
  },
  active: {
    backgroundColor: LIGHT_GRAY,
    borderRadius: 17,
  },
  labelWrapperStyle: {
    justifyContent: 'flex-start',
  },
  buttonLabelStyle: {
    fontWeight: 'normal',
    color: GRAY,
  },
  buttonLabelStyleSelected: {
    color: 'black',
  },
  error: {
    color: RED,
    fontSize: 12,
    marginTop: 5,
  },
});

export default DateTimePicker;
