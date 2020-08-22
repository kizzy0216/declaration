import React, {
  useState,
  useContext,
  useEffect,
  useRef,
} from 'react';
import {
  Animated,
  View,
  StyleSheet,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { InterfaceContext } from '~/contexts/InterfaceContext';
import {
  ContentTilePagerContext,
  FOCUS_ALL,
  FOCUS_CONTENTS,
} from '~/contexts/ContentTilePagerContext';
import ContentTileForeground from '~/components/ContentTileForeground';
import ContentTileBackground from '~/components/ContentTileBackground';
import ContentTileFooter from '~/components/ContentTileFooter';
import ContentTileFeedback from '~/components/ContentTileFeedback';
import {
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
  FEEDBACK_PAUSED_VIDEO,
  FEEDBACK_PLAYED_VIDEO,
} from '~/constants';
import { getStarAmount } from '~/utils/star';

function ContentTile({
  id,
  index,
  heading,
  subHeading,
  body,
  media,
  poll,
  session,
  event,
  availabilityListing,
  opportunityListing,
  creator,
  meta,
  onMenuRequest = () => {},
  onShareRequest = () => {},
  onCommentRequest = () => {},
  onPollOptionSelect = () => {},
  onStar = () => {},
  ...props
}) {
  const starAnimation = useRef(new Animated.ValueXY()).current;
  const fullscreenAnimation = useRef(new Animated.Value(0)).current;
  const {
    focus,
    setFocus,
    activeTileIndex,
  } = useContext(ContentTilePagerContext);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { setIsVisible: setIsInterfaceVisible } = useContext(InterfaceContext);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isFeedbackActive, setIsFeedbackActive] = useState(false);
  const [feedbackType, setFeedbackType] = useState('');
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [isStarring, setIsStarring] = useState(false);

  const controls = {
    hasImage: (
      media &&
      media.uri &&
      (
        media.uri.includes('jpg') ||
        media.uri.includes('png') ||
        media.uri.includes('gif') ||
        media.uri.includes('jpeg')
      )
    ),
    hasVideo: (
      media &&
      media.uri &&
      media.uri.includes('mp4')
    ),
    isVideoPlaying,
    isVideoMuted,
    isFullscreen,
  };

  const hasForeground = (
    heading ||
    subHeading ||
    body ||
    poll ||
    availabilityListing ||
    opportunityListing ||
    session ||
    event
  );

  useEffect(() => {
    setIsVideoPlaying(index === activeTileIndex && controls.hasVideo);

    if (isFullscreen) {
      setIsFullscreen(false);
    }
  }, [activeTileIndex]);

  useEffect(() => {
    setIsInterfaceVisible(!isFullscreen);
  }, [isFullscreen]);

  useEffect(() => {
    Animated.timing(fullscreenAnimation, {
      toValue: (isFullscreen ? 1 : 0),
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isFullscreen]);

  function handleBackgroundTap() {
    if (!controls.hasVideo) {
      return;
    }

    if (!isVideoPlaying) { // play
      setIsFeedbackActive(true);
      setFeedbackType(FEEDBACK_PLAYED_VIDEO);
      setTimeout(() => setIsFeedbackActive(false), 1000);
    } else { // pause
      setIsFeedbackActive(true);
      setFeedbackType(FEEDBACK_PAUSED_VIDEO);
      setTimeout(() => setIsFeedbackActive(false), 1000);
    }

    setIsVideoPlaying(!isVideoPlaying);
  }

  function handleStarPanActive({ x: x1, y: y1 }) {
    setIsStarring(true);
  }

  function handleStarPanEnd({ x: x2, y: y2 }) {
    const amount = getStarAmount({ value: x2 });
    onStar({ amount });

    setIsStarring(false);
    starAnimation.setValue({ x: 0, y: 0});
  }

  function handleCreatorPress() {
  }

  function handleHashtagPress() {
  }

  function handleStar() {
    onStar({ amount: 10 });

    setIsStarring(true);

    setTimeout(() => {
      setIsStarring(false);
    }, 500);
  }

  return (
    <View style={styles.contentTile}>
      <View style={styles.container}>
        <View
          style={[
            styles.backgroundWrapper,
          ]}
        >
          <ContentTileBackground
            index={index}
            media={media}
            controls={controls}
            isFocused={isFullscreen}
            hasForeground={hasForeground}
            onTap={handleBackgroundTap}
            onDoubleTap={handleStar}
            onLongPress={onMenuRequest}
            onDoubleTapPanActive={handleStarPanActive}
            onDoubleTapPan={Animated.event(
              [{ nativeEvent: { translationX: starAnimation.x, translationY: starAnimation.y } }],
              { useNativeDriver: false },
            )}
            onDoubleTapPanEnd={handleStarPanEnd}
          />
        </View>

        <View
          style={{
            ...styles.feedbackWrapper,
          }}
          pointerEvents="box-none"
        >
          <ContentTileFeedback
            isActive={isFeedbackActive}
            type={feedbackType}
          />
        </View>

        <Animated.View
          style={{
            ...styles.foregroundWrapper,
            ...(!media && !availabilityListing && !opportunityListing && styles.loweredForegroundWrapper),
            ...({
              opacity: fullscreenAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0],
              }),
              transform: [{
                translateY: fullscreenAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -50],
                }),
              }],
            }),
          }}
          pointerEvents={isFullscreen ? 'none' : 'box-none'}
        >
          <ContentTileForeground
            heading={heading}
            subHeading={subHeading}
            body={body}
            media={media}
            poll={poll}
            session={session}
            event={event}
            availabilityListing={availabilityListing}
            opportunityListing={opportunityListing}
            creator={creator}
            onPollOptionSelect={onPollOptionSelect}
          />
        </Animated.View>

        <Animated.View
          style={{
            ...styles.footerWrapper,
            ...({
              transform: [{
                translateY: fullscreenAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-100, -10],
                }),
              }],
            }),
          }}
          pointerEvents={isFullscreen ? 'auto' : 'box-none'}
        >
          <ContentTileFooter
            creator={creator}
            meta={meta}
            controls={controls}
            starAnimation={starAnimation}
            isStarring={isStarring}
            onCreatorPress={handleCreatorPress}
            onHashtagPress={handleHashtagPress}
            onStarPress={handleStar}
            onStarPan={Animated.event(
              [{ nativeEvent: { translationX: starAnimation.x, translationY: starAnimation.y } }],
              { useNativeDriver: false },
            )}
            onStarPanActive={handleStarPanActive}
            onStarPanEnd={handleStarPanEnd}
            onCommentPress={onCommentRequest}
            onSharePress={onShareRequest}
            onMenuPress={onMenuRequest}
            onVideoPlayToggle={setIsVideoPlaying}
            onVideoMuteToggle={setIsVideoMuted}
            onFullscreenToggle={setIsFullscreen}
          />
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentTile: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
  },
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  backgroundWrapper: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 0,
  },
  feedbackWrapper: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9,
  },
  loweredForegroundWrapper: {
    marginTop: '20%',
  },
  footerWrapper: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 4,
  },
});

export default ContentTile;
