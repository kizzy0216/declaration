import React, { useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import {
  BLUE,
  GRAY,
} from '~/constants';

function Avatar({
  name = '',
  imageSrc,
  theme = 'primary', // primary, secondary
  size = 'medium', // small, medium, large
  isTouchable = false,
  onPress = () => {},
}) {
  const [hasLoaded, setHasLoaded] = useState(false);
  const initials = (
    name && name.length > 0
    ?  name
      .split(' ')
      .map((word) => word[0])
      .join('')
    : '??'
  );

  function handleLoad() {
    setHasLoaded(true);
  }

  const avatarElement = (
    <View
      style={[
        styles.avatar,
        styles[theme],
        styles[size],
        hasLoaded && styles.imageLoaded,
      ]}
    >
      <View style={hasLoaded && styles.initialsImageLoaded}>
        <Text style={styles.initials}>{initials}</Text>
      </View>

      {imageSrc &&
        <Image
          style={[
            styles.image,
            styles[`${size}Image`],
            hasLoaded && styles.imageImageLoaded,
          ]}
          source={{
            uri: imageSrc,
          }}
          onLoad={handleLoad}
        />
      }
    </View>
  );

  if (isTouchable) {
    return (
      <TouchableOpacity
        onPress={onPress}
        containerStyle={{ overflow: 'hidden' }}
      >
        {avatarElement}
      </TouchableOpacity>
    );
  }

  return avatarElement;
}

const styles = StyleSheet.create({
  avatar: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  primary: {
    backgroundColor: BLUE,
  },
  secondary: {
    backgroundColor: GRAY,
  },
  imageLoaded: {
    backgroundColor: 'white',
  },
  small: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  medium: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  large: {
    width: 144,
    height: 144,
    borderRadius: 72,
  },
  initials: {
    lineHeight: 1,
    fontSize: 14,
    fontWeight: 'bold',
    opacity: 1,
    color: 'white',
  },
  initialsImageLoaded: {
    opacity: 0,
  },
  image: {
    opacity: 0,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  smallImage: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  mediumImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  largeImage: {
    width: 144,
    height: 144,
    borderRadius: 72,
  },
  imageImageLoaded: {
    opacity: 1,
  },
});

export default Avatar;
