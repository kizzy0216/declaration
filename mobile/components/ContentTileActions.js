import React, { useRef, useEffect, useMemo, useContext } from 'react';
import { Animated, View, StyleSheet, Text } from 'react-native';
import { TouchableOpacity, TapGestureHandler } from 'react-native-gesture-handler';
import HeartIcon from '@shared/components/icons/HeartIcon';
import NewHeartIcon from '@shared/components/icons/NewHeartIcon';
import NewGreenHeartIcon from '@shared/components/icons/NewGreenHeartIcon';
import CommentIcon from '@shared/components/icons/CommentIcon';
import NewCommentIcon from '@shared/components/icons/NewCommentIcon';
import NewMessagesIcon from '@shared/components/icons/NewMessagesIcon';
import ShareIcon from '@shared/components/icons/ShareIcon';
import KebabIcon from '@shared/components/icons/KebabIcon';
import FullscreenIcon from '@shared/components/icons/FullscreenIcon';
import NewFullScreenIcon from '@shared/components/icons/NewFullscreenIcon';
import NormalScreenIcon from '@shared/components/icons/NormalScreenIcon';
import AudioIcon from '@shared/components/icons/AudioIcon';
import NoAudioIcon from '@shared/components/icons/NoAudioIcon';
import { ContentTilePagerContext } from '~/contexts/ContentTilePagerContext';

// const LIGHT_FILL = 'rgba(255,255,255, 0.8)';
const LIGHT_FILL = '#fff';
// const DARK_FILL = 'rgba(0,0,0, 0.6)';
const DARK_FILL = '#222';

function ContentTileActions({
  controls = {},
  isStarred,
  onStarPress = () => {},
  onCommentPress = () => {},
  onMenuPress = () => {},
  onVideoMuteToggle = () => {},
  onFullscreenToggle = () => {},
}) {

  const { activeItem } = useContext(ContentTilePagerContext);

  const hideLeftAnimation = useRef(new Animated.Value(0)).current;

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
            {isStarred ? <NewGreenHeartIcon /> : <NewHeartIcon fill={theme === 'light' ? '#fff' : '#222'} />}
            <Text
              style={{
                ...styles.count,
                color: (theme === 'light' ? '#fff' : '#222')
              }}
            >
              {activeItem?.content_stars_aggregate?.aggregate ? activeItem?.content_stars_aggregate?.aggregate.count : ''  }
            </Text>
          </View>
        </TapGestureHandler>
        <TouchableOpacity
          style={styles.action}
          onPress={() => onCommentPress()}
        >
          <NewCommentIcon
            fill={theme === 'light' ? '#fff' : '#222'}
          />
          <Text
            style={{
              ...styles.count,
              color: theme === 'light' ? '#fff' : '#222'
            }}
          >
            {activeItem?.content_comments_aggregate?.aggregate ? activeItem?.content_comments_aggregate?.aggregate.count : ''  }
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.action,
            opacity: 0.5
          }}
          // onPress={() => onSharePress()}
        >
          <NewMessagesIcon
            style={{opacity: 0.65}}
            fill={theme === 'light' ? '#fff' : '#222'}
          />
          <Text
            style={{
              ...styles.count,
              color: (theme === 'light' ? '#fff' : '#222'),
            }}
          >
            4
          </Text>
        </TouchableOpacity>

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
          {controls.hasVideo || controls.hasImage ? 
            <TouchableOpacity
              style={styles.action}
              onPress={() => onFullscreenToggle(!controls.isFullscreen)}
            >
              {controls.isFullscreen
                ? ( 
                  <></>
                  // <NormalScreenIcon
                  //   width={30}
                  //   height={30}
                  //   fill={theme === 'light' ? LIGHT_FILL : DARK_FILL}
                  // />
                ) : (
                  // <NewFullScreenIcon />
                  <FullscreenIcon
                    width={30}
                    height={30}
                    fill={theme === 'light' ? LIGHT_FILL : DARK_FILL}
                  />
                )
              }
            </TouchableOpacity>
            : <View style={[styles.action, {width: 30, height: 30}]}></View>
          }
        </Animated.View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  actions: {
    position: 'relative',
    paddingTop: 5,
    paddingRight: 30,
    paddingLeft: 0,
    paddingBottom: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  action: {
    position: 'relative',
    paddingTop: 20,
    // paddingRight: 10,
    paddingBottom: 0,
    // paddingLeft: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  left: {
    marginLeft: 40,
    justifyContent: 'flex-end',
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
    marginLeft: 0,
  },
  count: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 5,
    opacity: 0.65
  }
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
