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
  theme = 'primary', // primary, secondary, tertiary, transparent
  size = 'medium', // small, medium
  labelStyle,
  labelWrapperStyle,
  leftIcon,
  rightIcon,
  style,
  isFetching,
  isDisabled,
  onPress = () => {},
}) {
  const spinnerFill = (
    theme === 'transparent' || theme === 'tertiary'
    ? 'black'
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
    color: 'black',
  },

  tertiary: {
    backgroundColor: 'white',
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

  small: {
    borderRadius: 10,
  },
  smallLabelWrapper: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
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
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
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
