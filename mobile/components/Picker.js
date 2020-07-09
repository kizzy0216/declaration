import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Platform,
} from 'react-native';
import { Picker as RNPicker } from '@react-native-community/picker';

import Button from '~/components/Button';
import Colors from '~/constants/Colors';

function Picker({
  label,
  value,
  placeholder,
  options = [],
  onChange = () => {},
  ...props
}) {
  const [isActive, setIsActive] = useState(false);

  const element = (
    <RNPicker
      style={styles.rnPicker}
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
            labelStyle={styles.buttonLabelStyle}
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
    backgroundColor: Colors.lightGray,
  },
  iosWrapper: {
  },
  active: {
    backgroundColor: Colors.lightGray,
    borderRadius: 17,
  },
  buttonLabelStyle: {
    textAlign: 'left',
    fontWeight: 'normal',
    color: Colors.gray,
  },
});

export default Picker;
