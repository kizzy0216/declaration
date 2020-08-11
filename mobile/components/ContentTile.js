import React, {
  useState,
  useContext,
  useEffect,
} from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { State, LongPressGestureHandler } from 'react-native-gesture-handler';

import { InterfaceContext } from '~/contexts/InterfaceContext';
import {
  ContentTilePagerContext,
  FOCUS_ALL,
  FOCUS_CONTENTS,
} from '~/contexts/ContentTilePagerContext';
import ContentTileForeground from '~/components/ContentTileForeground';
import ContentTileBackground from '~/components/ContentTileBackground';
import ContentTileFooter from '~/components/ContentTileFooter';

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
  ...props
}) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const {
    focus,
    setFocus,
    activeTileIndex,
  } = useContext(ContentTilePagerContext);
  const { setIsVisible: setIsInterfaceVisible } = useContext(InterfaceContext);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);

  useEffect(() => {
    setIsVideoPlaying(index === activeTileIndex);

    if (isFullscreen) {
      setIsFullscreen(false);
    }
  }, [activeTileIndex]);

  useEffect(() => {
    setIsInterfaceVisible(!isFullscreen);
  }, [isFullscreen]);

  function handleBackgroundPress() {
    if (focus === FOCUS_ALL) {
      setFocus(FOCUS_CONTENTS);
    } else if (focus === FOCUS_CONTENTS) {
      setFocus(FOCUS_ALL);
    }
  }

  function handleCreatorPress() {
  }

  function handleHashtagPress() {
  }

  function handleStarPress() {
  }

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
  }

  return (
    <LongPressGestureHandler
      onHandlerStateChange={({ nativeEvent }) => {
        if (nativeEvent.state === State.ACTIVE) {
          onMenuRequest();
        }
      }}
      minDurationMs={800}
    >
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
              onPress={handleBackgroundPress}
            />
          </View>

          <View
            style={[
              styles.foregroundWrapper,
              !media && styles.foregroundWrapperWithoutMedia,
              (isFullscreen) && styles.hidden,
            ]}
          >
            <ContentTileForeground
              heading={heading}
              subHeading={subHeading}
              body={body}
              poll={poll}
              session={session}
              event={event}
              availabilityListing={availabilityListing}
              opportunityListing={opportunityListing}
            />
          </View>

          <View
            style={[
              styles.footerWrapper,
              (isFullscreen) && styles.lower,
            ]}
            pointerEvents="box-none"
          >
            <ContentTileFooter
              creator={creator}
              meta={meta}
              controls={controls}
              onCreatorPress={handleCreatorPress}
              onHashtagPress={handleHashtagPress}
              onStarPress={handleStarPress}
              onCommentPress={onCommentRequest}
              onSharePress={onShareRequest}
              onMenuPress={onMenuRequest}
              onVideoPlayToggle={setIsVideoPlaying}
              onVideoMuteToggle={setIsVideoMuted}
              onFullscreenToggle={setIsFullscreen}
            />
          </View>
        </View>
      </View>
    </LongPressGestureHandler>
  );
}

const styles = StyleSheet.create({
  contentTile: {
    width: '100%',
    height: '100%',
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
    zIndex: -1,
  },
  foregroundWrapperWithoutMedia: {
    marginTop: '20%',
  },
  footerWrapper: {
    width: '100%',
    position: 'absolute',
    bottom: 100,
    left: 0,
    zIndex: 2,
  },
  hidden: {
    opacity: 0,
  },
  lower: {
    bottom: 10,
  },
});

export default ContentTile;
