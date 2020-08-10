import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import {
  ContentTilePagerContext,
  FOCUS_MEDIA,
  FOCUS_CONTENTS,
} from '~/contexts/ContentTilePagerContext';
import { InterfaceContext } from '~/contexts/InterfaceContext';
import LikeIcon from 'Shared/components/icons/LikeIcon';
import CommentIcon from 'Shared/components/icons/CommentIcon';
import KebabIcon from 'Shared/components/icons/KebabIcon';
import PlayIcon from 'Shared/components/icons/PlayIcon';
import PauseIcon from 'Shared/components/icons/PauseIcon';
import FullscreenIcon from 'Shared/components/icons/FullscreenIcon';
import NormalScreenIcon from 'Shared/components/icons/NormalScreenIcon';

const LIGHT_FILL = 'rgba(255,255,255,0.8)';
const DARK_FILL = 'rgba(0,0,0,0.6)';

function ContentTileActions({
  controls = {},
  onLikePress = () => {},
  onCommentPress = () => {},
  onMenuPress = () => {},
  onVideoPlayToggle = () => {},
  onFullscreenToggle = () => {},
}) {
  const { theme } = useContext(InterfaceContext);
  const { focus } = useContext(ContentTilePagerContext);

  return (
    <View
      style={styles.actions}
      pointerEvents="box-none"
    >
      <View
        style={[
          styles.left,
          styles.container,
          (focus === FOCUS_MEDIA || focus === FOCUS_CONTENTS) && styles.hidden,
        ]}
      >
        <TouchableOpacity
          style={styles.action}
          onPress={() => onLikePress()}
        >
          <LikeIcon
            width={24}
            height={24}
            fill={theme === 'light' ? LIGHT_FILL : DARK_FILL}
          />
        </TouchableOpacity>
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
          onPress={() => onMenuPress()}
        >
          <KebabIcon
            width={24}
            height={24}
            fill={theme === 'light' ? LIGHT_FILL : DARK_FILL}
          />
        </TouchableOpacity>
      </View>

      <View style={[styles.right, styles.container]}>
        {controls.hasVideo &&
          <TouchableOpacity
            style={styles.action}
            onPress={() => onVideoPlayToggle(!controls.shouldPlayVideo)}
          >
            {controls.shouldPlayVideo
              ? (
                <PauseIcon
                  width={24}
                  height={24}
                  fill={theme === 'light' ? LIGHT_FILL : DARK_FILL}
                />
              ) : (
                <PlayIcon
                  width={24}
                  height={24}
                  fill={theme === 'light' ? LIGHT_FILL : DARK_FILL}
                />
              )
            }
          </TouchableOpacity>
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  actions: {
    paddingTop: 0,
    paddingRight: 30,
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
