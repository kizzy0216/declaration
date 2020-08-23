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

import { ContentTilePagerContext } from '~/contexts/ContentTilePagerContext';
import ContentTileByline from '~/components/ContentTileByline';
import ContentTileActions from '~/components/ContentTileActions';

function ContentTileFooter({
  creator,
  meta,
  controls = {},
  starAnimation,
  isStarred = false,
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

  const isBylineHidden = (
    controls.isFullscreen
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

      <ContentTileActions
        controls={controls}
        starAnimation={starAnimation}
        isStarred={isStarred}
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
