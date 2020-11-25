import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity, BorderlessButton } from 'react-native-gesture-handler';

import AnimatedSpinnerIcon from '~/components/AnimatedSpinnerIcon';
import {
  BLACK,
  BLUE,
  LIGHT_GRAY,
  RED,
} from '~/constants';

function Button({
  label,
  theme = 'primary', // primary, secondary, tertiary, transparent, danger
  size = 'medium', // tiny, small, medium
  leftIcon,
  rightIcon,
  style,
  buttonStyle,
  labelStyle,
  labelWrapperStyle,
  isFetching,
  isDisabled,
  onPress = () => {},
  onLongPress = () => {}
}) {
  const spinnerFill = (
    theme === 'transparent' || theme === 'tertiary'
    ? BLACK
    : 'white'
  );

  const inner = (
    <View
      accessible
      style={[
        styles.button,
        styles[theme],
        styles[size],
        isDisabled && styles.disabled,
        theme === 'tertiary' && size === 'medium' && styles.mediumShadow,
        theme === 'tertiary' && size === 'small' && styles.smallShadow,
        buttonStyle,
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
          styles[`${size}LabelWrapper`],
          labelWrapperStyle,
        ]}
      >
        {isFetching
          ? (
            <AnimatedSpinnerIcon
              width={16}
              height={16}
              fill={spinnerFill}
            />
          ) : (
            <Text
              style={[
                styles.label,
                styles[`${theme}Label`],
                styles[`${size}Label`],
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
        onLongPress={onLongPress}
        disabled={isDisabled}
        containerStyle={{
          overflow: 'visible',
        }}
      >
        {inner}
      </BorderlessButton>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
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
    overflow: 'visible',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  labelWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  label: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
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

  primary: {
    backgroundColor: BLUE,
  },

  secondary: {
    backgroundColor: LIGHT_GRAY,
  },
  secondaryLabel: {
    color: BLACK,
  },

  tertiary: {
    backgroundColor: 'white',
  },
  tertiaryLabel: {
    color: BLACK,
  },

  transparent: {
    backgroundColor: 'transparent',
  },
  transparentLabel: {
    backgroundColor: 'transparent',
    color: BLACK,
  },

  danger: {
    backgroundColor: RED,
  },
  dangerLabel: {
    color: 'white',
  },

  tinyLabel: {
    fontSize: 12,
  },

  small: {
    borderRadius: 10,
  },
  smallLabel: {
    fontSize: 14,
  },
  smallLabelWrapper: {
    paddingTop: 12,
    paddingRight: 20,
    paddingBottom: 12,
    paddingLeft: 20,
  },
  smallShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 30,
    elevation: 20,
  },

  mediumLabelWrapper: {
    paddingTop: 20.5,
    paddingRight: 20,
    paddingBottom: 20.5,
    paddingLeft: 20,
  },
  mediumShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 30,
    elevation: 20,
  },
});

export default Button;
