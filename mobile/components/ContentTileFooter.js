import React, { useContext } from 'react';
import {
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

function ContentTileFooter({
  creator,
  meta,
  controls = {
    hasVideo: false,
    isVideoPlaying: false,
  },
  onCreatorPress = () => {},
  onHashtagPress = () => {},
  onStarPress = () => {},
  onCommentPress = () => {},
  onSharePress = () => {},
  onMenuPress = () => {},
  onVideoPlayToggle = () => {},
  onVideoMuteToggle = () => {},
  onFullscreenToggle = () => {},
}) {
  const { focus } = useContext(ContentTilePagerContext);

  return (
    <View
      style={styles.footer}
      pointerEvents="box-none"
    >
      <View
        style={[
          styles.bylineWrapper,
          (focus === FOCUS_MEDIA || focus === FOCUS_CONTENTS || controls.isFullscreen) && styles.hidden,
        ]}
        pointerEvents="box-none"
      >
        <ContentTileByline
          creator={creator}
          meta={meta}
          onCreatorPress={onCreatorPress}
          onHashtagPress={onHashtagPress}
        />
      </View>
      <ContentTileActions
        controls={controls}
        onStarPress={onStarPress}
        onCommentPress={onCommentPress}
        onSharePress={onSharePress}
        onMenuPress={onMenuPress}
        onVideoPlayToggle={onVideoPlayToggle}
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
