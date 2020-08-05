import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { Video } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';

const VideoBackground = ({
  source,
  posterSource,
  posterStyle,
  style,
  videoStyle,
  withGradient = false,
  children,
}) => {
  return (
    <View
      style={[
        styles.videoBackground,
        style,
      ]}
    >
      <Video
        source={source}
        posterSource={posterSource}
        posterStyle={[styles.poster, posterStyle]}
        usePoster={!!posterSource}
        resizeMode="cover"
        shouldPlay={true}
        isMuted={true}
        isLooping={true}
        style={[
          styles.video,
          videoStyle,
        ]}
      />

      {withGradient &&
        <LinearGradient
          colors={['rgba(0,0,0,0)','rgba(0,0,0,0.7)']}
          style={styles.gradient}
        />
      }

      <View style={styles.childrenWrapper}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  videoBackground: {
    position: 'relative',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: -2,
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  childrenWrapper: {
    flexGrow: 1,
    width: '100%',
  },
  poster: {
    position: 'absolute',
    height: '100%',
  },
});

export default VideoBackground;
