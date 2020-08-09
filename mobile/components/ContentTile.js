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
  FOCUS_MEDIA,
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
  ...props
}) {
  const [isModalActive, setIsModalActive] = useState(false);
  const {
    focus,
    setFocus,
    activeTileIndex,
  } = useContext(ContentTilePagerContext);
  const [shouldPlayVideo, setShouldPlayVideo] = useState(false);

  const isVideo = (
    media &&
    media.uri &&
    media.uri.includes('mp4')
  );

  useEffect(() => {
    setShouldPlayVideo(index === activeTileIndex);
  }, [activeTileIndex]);

  function handleLongPress() {
    onMenuRequest({ id });
  }

  function handleBackgroundPress() {
    if (focus === FOCUS_ALL) {
      if (media) {
        setFocus(FOCUS_MEDIA);
      } else {
        setFocus(FOCUS_CONTENTS);
      }
    } else if (focus === FOCUS_MEDIA) {
      setFocus(FOCUS_CONTENTS);
    } else if (focus === FOCUS_CONTENTS) {
      setFocus(FOCUS_ALL);
    }
  }

  function handleCreatorPress() {
  }

  function handleHashtagPress() {
  }

  function handleLikePress() {
  }

  function handleCommentPress() {
  }

  function handleMenuPress() {
    onMenuRequest({ id });
  }

  function handleVideoPlayToggle(updatedShouldPlayVideo) {
    setShouldPlayVideo(updatedShouldPlayVideo);
  }

  const controls = {
    hasVideo: isVideo,
    shouldPlayVideo,
  }

  return (
    <LongPressGestureHandler
      onHandlerStateChange={({ nativeEvent }) => {
        if (nativeEvent.state === State.ACTIVE) {
          handleLongPress();
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
              isFocused={focus === FOCUS_MEDIA}
              onPress={handleBackgroundPress}
            />
          </View>

          <View
            style={[
              styles.foregroundWrapper,
              !media && styles.foregroundWrapperWithoutMedia,
              (focus === FOCUS_MEDIA) && styles.hidden,
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
              (focus === FOCUS_MEDIA) && styles.lower,
            ]}
            pointerEvents="box-none"
          >
            <ContentTileFooter
              creator={creator}
              meta={meta}
              controls={controls}
              onCreatorPress={handleCreatorPress}
              onHashtagPress={handleHashtagPress}
              onLikePress={handleLikePress}
              onCommentPress={handleCommentPress}
              onMenuPress={handleMenuPress}
              onVideoPlayToggle={handleVideoPlayToggle}
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
