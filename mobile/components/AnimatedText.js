import React, { useEffect, useState } from 'react';
import {
  TextInput,
  Text,
  Animated,
} from 'react-native';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

function AnimatedText({
  animatedValue,
  formatValue = (value) => value,
  style,
}) {
  const [formattedLabel, setFormattedLabel] = useState('');

  useEffect(() => {
    const id = animatedValue.addListener(({ value }) => {
      setFormattedLabel(formatValue(value));
    });

    return () => {
      animatedValue.removeListener(id);
    }
  }, [animatedValue]);

  return (
    <>
      <AnimatedTextInput
        underlineColorAndroid="transparent"
        editable={false}
        value={formattedLabel}
        style={{
          fontSize: 16,
          ...style,
        }}
      />
    </>
  );
}

export default AnimatedText;
