import React, { useContext } from 'react';
import {
  View,
  StyleSheet,
  Image,
} from 'react-native';
import { State, TapGestureHandler } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { Video } from 'expo-av';

import { ContentTilePagerContext } from '~/contexts/ContentTilePagerContext';
import {
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
} from '~/constants';

function ContentTileBackground({
  index,
  media = null,
  controls,
  isFocused = false,
  onPress = () => {},
}) {
  const isImage = (
    media &&
    media.uri &&
    (
      media.uri.includes('jpg') ||
      media.uri.includes('png') ||
      media.uri.includes('gif') ||
      media.uri.includes('jpeg')
    )
  );

  const isVideo = (
    media &&
    media.uri &&
    media.uri.includes('mp4')
  );

  return (
    <TapGestureHandler
      onHandlerStateChange={({ nativeEvent }) => {
        if (nativeEvent.state === State.END) {
          onPress();
        }
      }}
    >
      <View style={styles.background}>
        {media && !isFocused &&
          <LinearGradient
            colors={['rgba(0,0,0,0.7)','rgba(0,0,0,0)']}
            style={[styles.gradient, styles.topGradient]}
          />
        }

        <View style={styles.media}>
          {media && isImage &&
            <Image
              source={media}
              resizeMode="cover"
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          }
          {media && isVideo &&
            <Video
              source={media}
              resizeMode="cover"
              shouldPlay={controls.shouldPlayVideo}
              isMuted={true}
              isLooping={true}
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          }
        </View>

        {media && !isFocused &&
          <LinearGradient
            colors={['rgba(0,0,0,0)','rgba(0,0,0,0.7)']}
            style={[styles.gradient, styles.bottomGradient]}
          />
        }
      </View>
    </TapGestureHandler>
  );
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  media: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 0,
  },
  gradient: {
    width: '100%',
    height: '33%',
    position: 'absolute',
    zIndex: 1,
    left: 0,
  },
  topGradient: {
    top: 0,
  },
  bottomGradient: {
    bottom: 0,
  },
});

export default ContentTileBackground;
