import React, { useRef, useEffect } from 'react';
import {
  Animated,
  View,
  Image,
  StyleSheet,
} from 'react-native';

function KenBurnsImage({
  source,
  style,
  imageStyle,
}) {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(Animated.timing(animation, {
      toValue: 1,
      duration: 30000,
      useNativeDriver: true,
    })).start();
  }, []);

  return (
    <View style={[styles.container, style]}>
      <Animated.Image
        source={source}
        resizeMode="cover"
        style={{
          ...styles.image,
          ...imageStyle,
          transform: [{
            scale: animation.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [1, 1.3, 1],
            }),
          }]
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    position: 'relative',
  },
});

export default KenBurnsImage;
