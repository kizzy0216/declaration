import React, {
  useContext,
  useRef,
  useEffect,
  useState,
} from 'react';
import {
  Animated,
  View,
  StyleSheet,
  Image,
} from 'react-native';
import {
  State,
  TapGestureHandler,
  LongPressGestureHandler,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { Video } from 'expo-av';

import { ContentTilePagerContext } from '~/contexts/ContentTilePagerContext';
import {
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
} from '~/constants';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

function ContentTileBackground({
  index,
  media = null,
  controls,
  hasForeground = false,
  isFocused = false,
  onTap = () => {},
  onDoubleTap = () => {},
  onLongPress = () => {},
  onDoubleTapPan = () => {},
  onDoubleTapPanActive = () => {},
  onDoubleTapPanEnd = () => {},
}) {
  const [canPan, setCanPan] = useState(false);
  const [isPanning, setIsPanning] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;
  const longPressRef = useRef();
  const tapRef = useRef();
  const doubleTapRef = useRef();
  const doubleTapPanRef = useRef();

  useEffect(() => {
    Animated.timing(animation, {
      toValue: (isFocused ? 1 : 0),
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isFocused]);

  return (
    <LongPressGestureHandler
      ref={longPressRef}
      onHandlerStateChange={({ nativeEvent }) => {
        if (nativeEvent.state === State.ACTIVE) {
          onLongPress();
        }
      }}
      minDurationMs={800}
    >
      <TapGestureHandler
        ref={tapRef}
        onHandlerStateChange={({ nativeEvent }) => {
          if (nativeEvent.state === State.BEGAN) {
            setCanPan(true);
          }

          if (nativeEvent.state === State.END && !isPanning) {
            onTap();
            setCanPan(false);
          }

          if (
            (
              nativeEvent.state === State.CANCELLED ||
              nativeEvent.state === State.FAILED
            ) &&
            !isPanning
          ) {
            setCanPan(false);
          }
        }}
        waitFor={[doubleTapRef]}
        simultaneousHandlers={doubleTapPanRef}
      >
        <TapGestureHandler
          ref={doubleTapRef}
          onHandlerStateChange={({ nativeEvent }) => {
            if (nativeEvent.state === State.END) {
              onDoubleTap();
              setCanPan(false);
            }
          }}
          numberOfTaps={2}
          maxDurationMs={1000}
          simultaneousHandlers={doubleTapPanRef}
        >
          <PanGestureHandler
            enabled={canPan}
            ref={doubleTapPanRef}
            onGestureEvent={onDoubleTapPan}
            onHandlerStateChange={({ nativeEvent }) => {
              setIsPanning(true);

              if (nativeEvent.state === State.ACTIVE) {
                onDoubleTapPanActive({
                  x: nativeEvent.translationX,
                  y: nativeEvent.translationY,
                });
              }

              if (nativeEvent.state === State.END) {
                onDoubleTapPanEnd({
                  x: nativeEvent.translationX,
                  y: nativeEvent.translationY,
                });
                setCanPan(false);
                setIsPanning(false);
              }
            }}
            maxPointers={1}
          >
            <View style={styles.background}>
              {media &&
                <AnimatedLinearGradient
                  colors={['rgba(0,0,0,0.7)','rgba(0,0,0,0)']}
                  style={{
                    ...styles.gradient,
                    ...styles.topGradient,
                    opacity: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 0],
                    }),
                  }}
                  pointerEvents="none"
                />
              }

              {media && hasForeground &&
                <Animated.View
                  style={{
                    ...styles.overlay,
                    opacity: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 0],
                    }),
                  }}
                  pointerEvents="none"
                />
              }

              <View style={styles.media}>
                {controls.hasImage &&
                  <Image
                    source={media}
                    resizeMode="cover"
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                  />
                }

                {controls.hasVideo &&
                  <Video
                    source={media}
                    resizeMode="cover"
                    shouldPlay={controls.isVideoPlaying}
                    isMuted={controls.isVideoMuted}
                    isLooping={true}
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                  />
                }
              </View>

              {media &&
                <AnimatedLinearGradient
                  colors={['rgba(0,0,0,0)','rgba(0,0,0,0.7)']}
                  style={{
                    ...styles.gradient,
                    ...styles.bottomGradient,
                    opacity: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 0],
                    }),
                  }}
                  pointerEvents="none"
                />
              }
            </View>
          </PanGestureHandler>
        </TapGestureHandler>
      </TapGestureHandler>
    </LongPressGestureHandler>
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
  overlay: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 2,
    top: 0,
    left: 0,
  },
});

export default ContentTileBackground;
