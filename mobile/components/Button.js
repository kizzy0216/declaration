import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity, BorderlessButton } from 'react-native-gesture-handler';

import AnimatedSpinnerIcon from '~/components/AnimatedSpinnerIcon';
import {
  BLUE,
  LIGHT_GRAY,
} from '~/constants';

function Button({
  label,
  theme = 'primary',
  labelStyle,
  labelWrapperStyle,
  leftIcon,
  rightIcon,
  style,
  isFetching,
  isDisabled,
  onPress = () => {},
}) {
  const inner = (
    <View
      accessible
      style={[
        styles.button,
        styles[theme],
        styles.container,
        `${theme}Container`,
        isDisabled && styles.disabled,
      ]}
    >
      {leftIcon &&
        <View style={[styles.leftIcon, styles.leftIconWrapper]}>
          {leftIcon}
        </View>
      }

      <View
        style={[
          styles.labelWrapper,
          (rightIcon || leftIcon) && styles.hasIconLabel,
          labelWrapperStyle,
        ]}
      >
        {isFetching
          ? (
            <AnimatedSpinnerIcon
              width={16}
              height={16}
              fill="white"
            />
          ) : (
            <Text
              style={[
                styles.label, 
                styles[`${theme}Label`],
                labelStyle,
              ]}
            >
              {label}
            </Text>
          )
        }
      </View>

      {rightIcon &&
        <View style={[styles.rightIcon, styles.rightIconWrapper]}>
          {rightIcon}
        </View>
      }
    </View>
  );

  if (theme === 'transparent') {
    return (
      <BorderlessButton
        onPress={onPress}
        disabled={isDisabled}
      >
        {inner}
      </BorderlessButton>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      containerStyle={{
        overflow: 'visible',
      }}
      style={style}
      disabled={isDisabled}
    >
      {inner}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 17,
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  primary: {
    backgroundColor: BLUE,
  },
  secondary: {
    backgroundColor: LIGHT_GRAY,
  },
  secondaryLabel: {
    color: 'black',
  },
  tertiary: {
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 40,
    elevation: 20,
    overflow: 'visible',
  },
  tertiaryContainer: {
    backgroundColor: '#000',
  },
  tertiaryLabel: {
    color: 'black',
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  transparentLabel: {
    backgroundColor: 'transparent',
    color: 'black',
  },
  container: {
    borderRadius: 17,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelWrapper: {
    flex: 1,
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  label: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  hasIconLabel: {
    justifyContent: 'flex-start',
  },
  leftIconWrapper: {
    paddingLeft: 20,
  },
  rightIconWrapper: {
    paddingRight: 20,
  },
});

export default Button;
