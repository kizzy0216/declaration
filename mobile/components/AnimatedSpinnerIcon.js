import React, { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

import SpinnerIcon from 'Shared/components/icons/SpinnerIcon';

const AnimatedSpinnerIcon = ({
  width = 50,
  height = 50,
  fill = 'black',
}) => {
  const rotationAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(Animated.timing(rotationAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    })).start();
  }, []);

  return (
    <Animated.View
      width={width}
      height={height}
      style={{
        transform: [
          {
            rotate: rotationAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '360deg'],
            }),
          },
        ],
      }}
    >
      <SpinnerIcon
        width={width}
        height={height}
        fill={fill}
      />
    </Animated.View>
  );
}

export default AnimatedSpinnerIcon;
