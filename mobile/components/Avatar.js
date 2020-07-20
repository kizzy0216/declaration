import React, { useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
} from 'react-native';

import Colors from '~/constants/Colors';

function Avatar({
  name = '',
  imageSrc,
  theme = 'primary', // primary, secondary
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

  return (
    <View
      style={[
        styles.avatar,
        hasLoaded && styles.imageLoaded,
        styles[theme],
      ]}
    >
      <View
        style={[
          styles.initials,
          hasLoaded && styles.initialsImageLoaded,
        ]}
      >
        <Text>{initials}</Text>
      </View>

      {imageSrc &&
        <Image
          style={[
            styles.image,
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
}

const styles = StyleSheet.create({
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  primary: {
    backgroundColor: Colors.blue,
  },
  secondary: {
    backgroundColor: Colors.gray,
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
    width: 48,
    height: 48,
    borderRadius: 24,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  imageImageLoaded: {
    opacity: 1,
  },
});

export default Avatar;
