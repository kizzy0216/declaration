import React, {
  useContext,
  useRef,
  useEffect,
  useState,
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

import {
  ContentTilePagerContext,
  FOCUS_MEDIA,
  FOCUS_CONTENTS,
} from '~/contexts/ContentTilePagerContext';
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

const LIGHT_FILL = 'rgba(255,255,255, 0.8)';
const DARK_FILL = 'rgba(0,0,0, 0.6)';

function ContentTileActions({
  controls = {},
  starAnimation,
  isStarring,
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
  const [canPan, setCanPan] = useState(false);
  const [isPanning, setIsPanning] = useState(false);
  const quickStarAnimation = useRef(new Animated.Value(0)).current;
  const featureStarAnimation = useRef(new Animated.Value(0)).current;
  const hideLeftAnimation = useRef(new Animated.Value(0)).current;
  const hideRightAnimation = useRef(new Animated.Value(0)).current
  const { focus } = useContext(ContentTilePagerContext);

  const isLeftHidden = (
    focus === FOCUS_MEDIA ||
    focus === FOCUS_CONTENTS ||
    controls.isFullscreen
  );

  const isRightHidden = isStarring;

  const theme = (
    (controls.hasImage || controls.hasVideo) ? 'light' : 'dark'
  );

  useEffect(() => {
    Animated.timing(quickStarAnimation, {
      toValue: (isStarring ? 1 : 0),
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isStarring]);

  useEffect(() => {
    Animated.timing(hideLeftAnimation, {
      toValue: (isLeftHidden ? 1 : 0),
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isLeftHidden]);

  useEffect(() => {
    Animated.timing(hideRightAnimation, {
      toValue: (isRightHidden ? 1 : 0),
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isRightHidden]);

  return (
    <View
      style={styles.actions}
      pointerEvents="box-none"
    >
      <Animated.View
        style={{
          ...styles.left,
          ...styles.container,
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
              opacity: starAnimation.x.interpolate({
                inputRange: [0, WINDOW_WIDTH - 90],
                outputRange: [1, 0.5],
                extrapolate: 'clamp',
              }),
            }}
        >
          <TapGestureHandler
            ref={tapRef}
            onHandlerStateChange={({ nativeEvent }) => {
              if (nativeEvent.state === State.BEGAN) {
                setCanPan(true);
              }

              if (nativeEvent.state === State.END && !isPanning) {
                onStarPress();
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
            simultaneousHandlers={panRef}
          >
            <PanGestureHandler
              ref={panRef}
              onGestureEvent={onStarPan}
              onHandlerStateChange={({ nativeEvent }) => {
                if (nativeEvent.state === State.ACTIVE) {
                  onStarPanActive({
                    x: nativeEvent.absoluteX,
                    y: nativeEvent.absoluteY,
                  });
                }

                if (nativeEvent.state === State.END) {
                  onStarPanEnd({
                    x: nativeEvent.absoluteX,
                    y: nativeEvent.absoluteY,
                  });
                }
              }}
              maxPointers={1}
            >
              <View style={styles.action}>
                <StarFilledIcon
                  width={24}
                  height={24}
                  fill={starAnimation.x.interpolate({
                    inputRange: [0, (WINDOW_WIDTH - 90)],
                    outputRange: [(theme === 'light' ? LIGHT_FILL : DARK_FILL), PUNCHY_BLUE],
                    extrapolate: 'clamp',
                  })}
                />
              </View>
            </PanGestureHandler>
          </TapGestureHandler>
        </Animated.View>

        <Animated.View
          style={{
            ...styles.container,
            opacity: hideRightAnimation.interpolate({
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
          <TouchableOpacity
            style={styles.action}
            onPress={() => onSharePress()}
          >
            <ShareIcon
              width={24}
              height={24}
              fill={theme === 'light' ? LIGHT_FILL : DARK_FILL}
            />
          </TouchableOpacity>
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
          opacity: hideRightAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0],
          }),
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
    paddingTop: 0,
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  action: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
  },
  container: {
    flexDirection: 'row',
  },
  left: {
    justifyContent: 'flex-start',
  },
  right: {
    justifyContent: 'flex-end',
  },
  hidden: {
    opacity: 0,
  },
});

export default ContentTileActions;
