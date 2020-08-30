import React, {
  useContext,
  useRef,
  useEffect,
  useState,
  useCallback,
} from 'react';
import {
  Animated,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {
  TouchableOpacity,
  PanGestureHandler,
  TapGestureHandler,
  State,
} from 'react-native-gesture-handler';
import { BlurView } from 'expo-blur';

import { ContentTilePagerContext } from '~/contexts/ContentTilePagerContext';
import AnimatedText from '~/components/AnimatedText';
import StarFilledIcon from '@shared/components/icons/StarFilledIcon';
import CommentIcon from '@shared/components/icons/CommentIcon';
import ShareIcon from '@shared/components/icons/ShareIcon';
import KebabIcon from '@shared/components/icons/KebabIcon';
import PlayIcon from '@shared/components/icons/PlayIcon';
import PauseIcon from '@shared/components/icons/PauseIcon';
import FullscreenIcon from '@shared/components/icons/FullscreenIcon';
import NormalScreenIcon from '@shared/components/icons/NormalScreenIcon';
import AudioIcon from '@shared/components/icons/AudioIcon';
import NoAudioIcon from '@shared/components/icons/NoAudioIcon';
import {
  WINDOW_WIDTH,
  PUNCHY_BLUE,
} from '~/constants';
import { getStarAmount } from '~/utils/star';

const LIGHT_FILL = 'rgba(255,255,255, 0.8)';
const DARK_FILL = 'rgba(0,0,0, 0.6)';

function ContentTileActions({
  controls = {},
  starAnimation,
  isStarred,
  onStarPress = () => {},
  onStarPan = () => {},
  onStarPanActive = () => {},
  onStarPanEnd = () => {},
  onCommentPress = () => {},
  onSharePress = () => {},
  onMenuPress = () => {},
  onVideoMuteToggle = () => {},
  onFullscreenToggle = () => {},
}) {
  const tapRef = useRef();
  const panRef = useRef();
  const [isPanning, setIsPanning] = useState(false);
  const featureStarAnimation = useRef(new Animated.Value(0)).current;
  const hideLeftAnimation = useRef(new Animated.Value(0)).current;
  const { focus } = useContext(ContentTilePagerContext);

  const isLeftHidden = (
    controls.isFullscreen
  );

  const theme = (
    (controls.hasImage || controls.hasVideo) ? 'light' : 'dark'
  );

  useEffect(() => {
    Animated.timing(hideLeftAnimation, {
      toValue: (isLeftHidden ? 1 : 0),
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isLeftHidden]);

  return (
    <View
      style={styles.actions}
      pointerEvents="box-none"
    >
      <Animated.View
        style={{
          position: 'absolute',
          zIndex: 2,
          left: 20,
          top: 5,
          opacity: hideLeftAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0],
          }),
        }}
      >
        <Animated.View
          style={{
            transform: [{
              translateX: starAnimation.x.interpolate({
                inputRange: [0, WINDOW_WIDTH - 90],
                outputRange: [0, WINDOW_WIDTH - 90],
                extrapolate: 'clamp',
              }),
            }, {
              perspective: 1000,
            }],
          }}
        >
          <TapGestureHandler
            ref={tapRef}
            onHandlerStateChange={({ nativeEvent }) => {
              if (nativeEvent.state === State.END && !isPanning) {
                onStarPress();
              }
            }}
            simultaneousHandlers={panRef}
            maxDurationMs={200}
          >
            <PanGestureHandler
              enabled={!isStarred}
              ref={panRef}
              onGestureEvent={onStarPan}
              onHandlerStateChange={({ nativeEvent }) => {
                if (nativeEvent.state === State.BEGAN) {
                  setIsPanning(true);
                }

                if (nativeEvent.state === State.ACTIVE) {
                  onStarPanActive({
                    x: nativeEvent.translationX,
                    y: nativeEvent.translationY,
                  });
                }

                if (nativeEvent.state === State.END) {
                  onStarPanEnd({
                    x: nativeEvent.translationX,
                    y: nativeEvent.translationY,
                  });
                  setIsPanning(false);
                }
              }}
              maxPointers={1}
            >
              <View style={[styles.action, styles.starAction]}>
                <Animated.View
                  style={{
                    ...styles.starAmountIndicator,
                    opacity: starAnimation.x.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 1],
                    }),
                  }}
                  pointerEvents="none"
                >
                  <AnimatedText
                    animatedValue={starAnimation.x}
                    formatValue={(value) => {
                      const interpolatedValue = getStarAmount({ value });
                      return String(interpolatedValue);
                    }}
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: 12,
                    }}
                  />
                </Animated.View>

                <StarFilledIcon
                  width={36}
                  height={36}
                  fill={(
                    isStarred
                      ? PUNCHY_BLUE
                      : (theme === 'light' ? LIGHT_FILL : DARK_FILL)
                  )}
                />
              </View>
            </PanGestureHandler>
          </TapGestureHandler>
        </Animated.View>
      </Animated.View>

      <Animated.View
        style={{
          position: 'absolute',
          top: 10,
          left: 20,
          height: '80%',
          width: '100%',
          zIndex: 1,
          opacity: starAnimation.x.interpolate({
            inputRange: [0, (WINDOW_WIDTH - 90) * 0.15],
            outputRange: [0, 1],
          }),
        }}
        pointerEvents="none"
      >
        <BlurView
          intensity={100}
          style={styles.starTrack}
        >
          <View
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              width: '100%',
              height: '100%',
            }}
          />
        </BlurView>
      </Animated.View>

      <Animated.View
        style={{
          ...styles.left,
          ...styles.container,
        }}
      >
        <Animated.View
          style={{
            ...styles.container,
            opacity: hideLeftAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            }),
          }}
        >
          <TouchableOpacity
            style={styles.action}
            onPress={() => onCommentPress()}
          >
            <CommentIcon
              width={24}
              height={24}
              fill={theme === 'light' ? LIGHT_FILL : DARK_FILL}
            />
          </TouchableOpacity>
          {/* <TouchableOpacity */}
          {/*   style={styles.action} */}
          {/*   onPress={() => onSharePress()} */}
          {/* > */}
          {/*   <ShareIcon */}
          {/*     width={24} */}
          {/*     height={24} */}
          {/*     fill={theme === 'light' ? LIGHT_FILL : DARK_FILL} */}
          {/*   /> */}
          {/* </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.action}
            onPress={() => onMenuPress()}
          >
            <KebabIcon
              width={24}
              height={24}
              fill={theme === 'light' ? LIGHT_FILL : DARK_FILL}
            />
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>

      <Animated.View
        style={{
          ...styles.right,
          ...styles.container,
        }}
      >
        {controls.hasVideo &&
          <>
            <TouchableOpacity
              style={styles.action}
              onPress={() => onVideoMuteToggle(!controls.isVideoMuted)}
            >
              {controls.isVideoMuted
                ? (
                  <NoAudioIcon
                    width={24}
                    height={24}
                    fill={theme === 'light' ? LIGHT_FILL : DARK_FILL}
                  />
                ) : (
                  <AudioIcon
                    width={24}
                    height={24}
                    fill={theme === 'light' ? LIGHT_FILL : DARK_FILL}
                  />
                )
              }
            </TouchableOpacity>
          </>
        }
        {(controls.hasImage || controls.hasVideo) &&
          <TouchableOpacity
            style={styles.action}
            onPress={() => onFullscreenToggle(!controls.isFullscreen)}
          >
            {controls.isFullscreen
              ? (
                <NormalScreenIcon
                  width={24}
                  height={24}
                  fill={theme === 'light' ? LIGHT_FILL : DARK_FILL}
                />
              ) : (
                <FullscreenIcon
                  width={24}
                  height={24}
                  fill={theme === 'light' ? LIGHT_FILL : DARK_FILL}
                />
              )
            }
          </TouchableOpacity>
        }
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  actions: {
    position: 'relative',
    paddingTop: 5,
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  action: {
    position: 'relative',
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
  },
  left: {
    marginLeft: 40,
    justifyContent: 'flex-start',
  },
  right: {
    justifyContent: 'flex-end',
  },
  hidden: {
    opacity: 0,
  },

  starAction: {
    paddingTop: 5,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
  },
  starAmountIndicator: {
    position: 'absolute',
    opacity: 0,
    top: -30,
    backgroundColor: PUNCHY_BLUE,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  starTrack: {
    width: '100%',
    height: '100%',
    borderRadius: 17,
  },
});

export default ContentTileActions;
