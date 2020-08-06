import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Platform,
} from 'react-native';
import { Picker as RNPicker } from '@react-native-community/picker';

import Button from '~/components/Button';
import {
  LIGHT_GRAY,
  GRAY,
} from '~/constants';

function Picker({
  label,
  value,
  options = [],
  onChange = () => {},
  ...props
}) {
  const [isActive, setIsActive] = useState(false);

  const element = (
    <RNPicker
      style={styles.rnPicker}
      itemStyle={styles.rnPickerItem}
      selectedValue={value}
      onValueChange={onChange}
    >
      {options.map((option) => (
        <RNPicker.Item
          key={option.value}
          label={option.label}
          value={option.value}
        />
      ))}
    </RNPicker>
  );

  return (
    <View style={[styles.container, props.style]}>
      {label &&
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
            label={options.find((option) => option.value === value).label}
            onPress={() => setIsActive(!isActive)}
            theme="secondary"
            labelStyle={[styles.buttonLabel, value.length > 0 && styles.valueButtonLabel]}
            labelWrapperStyle={styles.buttonLabelWrapper}
          />

          {isActive && element}
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  },
  rnPicker: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  rnPickerItem: {
    textAlign: 'left',
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
  buttonLabel: {
    fontWeight: 'normal',
    color: GRAY,
    opacity: 0.5,
    fontSize: 14,
  },
  valueButtonLabel: {
    color: 'black',
    opacity: 1,
  },
  buttonLabelWrapper: {
    justifyContent: 'flex-start',
  },
});

export default Picker;
