import React, {
  useContext,
  useRef,
  useEffect,
} from 'react';
import {
  Text,
  Animated,
  View,
  StyleSheet,
} from 'react-native';

import {
  ContentTilePagerContext,
  FOCUS_MEDIA,
  FOCUS_CONTENTS,
} from '~/contexts/ContentTilePagerContext';
import ContentTileByline from '~/components/ContentTileByline';
import ContentTileActions from '~/components/ContentTileActions';
import { WINDOW_WIDTH } from '~/constants';
import AnimatedText from '~/components/AnimatedText';

function ContentTileFooter({
  creator,
  meta,
  controls = {},
  starAnimation,
  isStarring,
  stars = 0,
  onCreatorPress = () => {},
  onHashtagPress = () => {},
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
  const animation = useRef(new Animated.Value(0)).current;
  const { focus } = useContext(ContentTilePagerContext);
  const quickStarAnimation = useRef(new Animated.Value(0)).current;

  const isBylineHidden = (
    focus === FOCUS_MEDIA ||
    focus === FOCUS_CONTENTS ||
    controls.isFullscreen ||
    isStarring
  );

  useEffect(() => {
    Animated.timing(animation, {
      toValue: (isBylineHidden ? 1 : 0),
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isBylineHidden]);

  return (
    <View
      style={styles.footer}
      pointerEvents="box-none"
    >
      <Animated.View
        style={{
          ...styles.bylineWrapper,
          opacity: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0],
          }),
        }}
        pointerEvents="box-none"
      >
        <ContentTileByline
          creator={creator}
          meta={meta}
          controls={controls}
          onCreatorPress={onCreatorPress}
          onHashtagPress={onHashtagPress}
        />
      </Animated.View>

      <View style={{
        flexDirection: 'row',
        justifyContent: 'center',
      }}>
        {isStarring &&
          <AnimatedText
            animatedValue={starAnimation.x}
            formatValue={(value) => {
              const numberValue = Number(value);

              let interpolatedValue = (numberValue * 100) / (WINDOW_WIDTH - 90);
              if (interpolatedValue > 100) {
                interpolatedValue = 100;
              } else if (interpolatedValue < 0) {
                interpolatedValue = 0;
              }

              return String(Math.round(interpolatedValue));
            }}
            style={{
              color: 'gold',
              fontWeight: 'bold',
            }}
          />
        }
      </View>

      <ContentTileActions
        controls={controls}
        starAnimation={starAnimation}
        isStarring={isStarring}
        onStarPress={onStarPress}
        onStarPan={onStarPan}
        onStarPanActive={onStarPanActive}
        onStarPanEnd={onStarPanEnd}
        onCommentPress={onCommentPress}
        onSharePress={onSharePress}
        onMenuPress={onMenuPress}
        onVideoMuteToggle={onVideoMuteToggle}
        onFullscreenToggle={onFullscreenToggle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bylineWrapper: {
    width: '100%',
  },
  hidden: {
    opacity: 0,
  },
});

export default ContentTileFooter;
