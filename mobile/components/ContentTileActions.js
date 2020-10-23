import React, { useRef, useEffect } from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import { TouchableOpacity, TapGestureHandler } from 'react-native-gesture-handler';
import HeartIcon from '@shared/components/icons/HeartIcon';
import CommentIcon from '@shared/components/icons/CommentIcon';
// import ShareIcon from '@shared/components/icons/ShareIcon';
import KebabIcon from '@shared/components/icons/KebabIcon';
import FullscreenIcon from '@shared/components/icons/FullscreenIcon';
import NormalScreenIcon from '@shared/components/icons/NormalScreenIcon';
import AudioIcon from '@shared/components/icons/AudioIcon';
import NoAudioIcon from '@shared/components/icons/NoAudioIcon';

import { GREEN } from '~/constants';

const LIGHT_FILL = 'rgba(255,255,255, 0.8)';
const DARK_FILL = 'rgba(0,0,0, 0.6)';

function ContentTileActions({
  controls = {},
  isStarred,
  onStarPress = () => {},
  onCommentPress = () => {},
  onMenuPress = () => {},
  onVideoMuteToggle = () => {},
  onFullscreenToggle = () => {},
}) {
  // const panRef = useRef();
  // const [isPanning, setIsPanning] = useState(false);
  // const featureStarAnimation = useRef(new Animated.Value(0)).current;
  const hideLeftAnimation = useRef(new Animated.Value(0)).current;
  // const { focus } = useContext(ContentTilePagerContext);

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
            ...styles.container,
            opacity: hideLeftAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            }),
          }}
        >
          <TapGestureHandler
            onHandlerStateChange={() => {
                onStarPress();
            }}
            maxDurationMs={200}
          >
            <View style={[styles.action, styles.starAction]}>
              <HeartIcon
                width={36}
                height={36}
                fill={(
                  isStarred
                    ? GREEN
                    : (theme === 'light' ? LIGHT_FILL : DARK_FILL)
                )}
              />
            </View>
          </TapGestureHandler>
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
    paddingRight: 24,
    paddingLeft: 24,
    paddingBottom: 12,
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
  // starAmountIndicator: {
  //   position: 'absolute',
  //   opacity: 0,
  //   top: -30,
  //   backgroundColor: GREEN,
  //   paddingTop: 10,
  //   paddingRight: 10,
  //   paddingBottom: 10,
  //   paddingLeft: 10,
  //   borderRadius: 5,
  // },
  // starTrack: {
  //   width: '100%',
  //   height: '100%',
  //   borderRadius: 17,
  // },
});

export default ContentTileActions;
