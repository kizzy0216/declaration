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
  GREEN,
} from '~/constants';

function Avatar({
  name = '',
  imageSrc,
  theme = 'primary', // primary, secondary
  size = 'medium', // small, medium, large
  avatarStyle,
  isTouchable = false,
  showBorder = false,
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

  const hasImage = !!(
    imageSrc && imageSrc.length > 0
  );

  const avatarElement = (
    <View
      style={[
        styles.avatar,
        styles[theme],
        styles[size],
        hasLoaded && styles.imageLoaded,
        showBorder && !hasImage && styles.activeBorder,
        avatarStyle || {}
      ]}
    >
      <View style={hasLoaded && styles.initialsImageLoaded}>
        <Text style={styles.initials}>{initials}</Text>
      </View>

      {hasImage &&
        <Image
          style={[
            styles.image,
            styles[`${size}Image`],
            hasLoaded && styles.imageImageLoaded,
            showBorder && styles.activeBorder,
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
    backgroundColor: GRAY,
  },
  secondary: {
    backgroundColor: GRAY,
  },
  activeBorder: {
    borderWidth: 2,
    borderColor: GREEN
  },
  imageLoaded: {
    backgroundColor: 'white',
  },
  small: {
    width: 30,
    height: 30,
    borderRadius: 30,
  },
  medium: {
    width: 55,
    height: 55,
    borderRadius: 55,
  },
  large: {
    width: 144,
    height: 144,
    borderRadius: 72,
  },
  initials: {
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
    width: 30,
    height: 30,
    borderRadius: 30,
  },
  mediumImage: {
    width: 55,
    height: 55,
    borderRadius: 55,
    borderWidth: 1,
    borderColor: '#ccc',
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
