import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import {
  Animated,
  View,
  StyleSheet,
  TextInput,
  Text
} from 'react-native';
import { useMutation } from 'urql';

// import { SafeAreaView } from 'react-native-safe-area-context';
import ViewShot from 'react-native-view-shot';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { InterfaceContext } from '~/contexts/InterfaceContext';
import { ContentTilePagerContext } from '~/contexts/ContentTilePagerContext';
import { CreateContentContext } from '~/contexts/CreateContentContext';
import ContentTileForeground from '~/components/ContentTileForeground';
import ContentTileBackground from '~/components/ContentTileBackground';
import ContentTileFooter from '~/components/ContentTileFooter';
import ContentTileFeedback from '~/components/ContentTileFeedback';

import KeyboardSpacer from '~/components/KeyboardSpacer'
import InsertContentComment from '~/mutations/InsertContentComment';

import {
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
  FEEDBACK_PAUSED_VIDEO,
  FEEDBACK_PLAYED_VIDEO,
} from '~/constants';
// import { getStarAmount } from '~/utils/star';

const LIGHT_FILL = '#fff';
// const DARK_FILL = 'rgba(0,0,0, 0.6)';
const DARK_FILL = '#222';

function ContentTile({
  uuid,
  index,
  heading,
  subHeading,
  body,
  screenshot,
  media,
  poll,
  session,
  event,
  availabilityListing,
  opportunityListing,
  creator,
  meta,
  likes,
  comments,
  isStarred,
  hasBlackCommentBox,
  onMenuRequest = () => {},
  onShareRequest = () => {},
  onCommentRequest = () => {},
  onPollOptionSelect = () => {},
  onCreatorPress = () => {},
  onStar = () => {},
  onUnStar = () => {},
  ...props
}) {
  // const starAnimation = useRef(new Animated.ValueXY()).current;
  const fullscreenAnimation = useRef(new Animated.Value(0)).current;
  const viewPanel = useRef();
  const { activeIndex } = useContext(ContentTilePagerContext);
  const { updateScreenshot } = useContext(CreateContentContext);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { setIsVisible: setIsInterfaceVisible } = useContext(InterfaceContext);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isFeedbackActive, setIsFeedbackActive] = useState(false);
  const [feedbackType, setFeedbackType] = useState('');
  const [isVideoMuted, setIsVideoMuted] = useState(true);

  // blackCommentBox part
  const {
    itemUuids: contentItemUuids,
    // items: contentItems,
    activeIndex: activeContentIndex,
  } = useContext(ContentTilePagerContext);
  const [comment, setComment] = useState('')
  const [activeCommentId, setActiveCommmentId] = useState(null);
  const contentUuid = contentItemUuids[activeContentIndex];
  const [insertCommentResult, insertComment] = useMutation(InsertContentComment);

  function handleSubmit() {
    insertComment({
      text: comment,
      content_uuid: contentUuid,
      parent_comment_uuid: activeCommentId,
      ancestors: activeCommentId ? ([
        { ancestor_uuid: activeCommentId },
        ...activeComment.ancestors.map(({ uuid }) => ({
          ancestor_uuid: uuid,
        })),
      ]) : [],
    });

    setComment('')
  }

  const controls = {
    hasImage: (
      media &&
      media.uri &&
      (
        media.uri.includes('.jpg') ||
        media.uri.includes('.png') ||
        media.uri.includes('.gif') ||
        media.uri.includes('.jpeg') ||
        media.uri.includes('.heic')
      )
    ),
    hasVideo: (
      media &&
      media.uri && (
        media.uri.includes('.mp4') ||
        media.uri.includes('.mov')
      )
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
    if (viewPanel && viewPanel.current && !media && !screenshot) {
      viewPanel.current.capture().then(uri => {
        updateScreenshot(uuid, uri)
      })
    }
  }, [])
  const handleMediaLoaded = () => {
    if (viewPanel && viewPanel.current && !screenshot) {
      viewPanel.current.capture().then(uri => {
        updateScreenshot(uuid, uri)
      })
    }
  }

  useEffect(() => {
    setIsVideoPlaying(index === activeIndex && controls.hasVideo);

    if (isFullscreen) {
      setIsFullscreen(false);
    }
  }, [activeIndex]);

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

  const handleBackgroundTap = useCallback(() => {
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
  }, [isVideoPlaying]);

  const handleHashtagPress = useCallback(() => {
  }, []);

  const handleStar = useCallback(() => {
    if (isStarred) {
      return onUnStar();
    }

    onStar({ amount: 5 });

    // Animated.timing(starAnimation.x, {
    //   toValue: (WINDOW_WIDTH - 90) * 0.05,
    //   duration: 200,
    //   useNativeDriver: false,
    // }).start();

    // setTimeout(() => {
    //   Animated.timing(starAnimation.x, {
    //     toValue: 0,
    //     duration: 200,
    //     useNativeDriver: false,
    //   }).start();
    // }, 500);
  }, [isStarred]);
  const theme = (
    (controls.hasImage || controls.hasVideo) ? 'light' : 'dark'
  );

  return (
    <ViewShot ref={viewPanel} options={{ format: 'png', quality: 0.8 }}>
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
            isStarred={isStarred}
            hasForeground={hasForeground}
            onMediaLoaded={handleMediaLoaded}
            onTap={handleBackgroundTap}
            onLongPress={onMenuRequest}
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
            likes={likes}
            comments={comments}
            controls={controls}
            // starAnimation={starAnimation}
            isStarred={isStarred}
            onCreatorPress={onCreatorPress}
            onHashtagPress={handleHashtagPress}
            onStarPress={handleStar}
            onCommentPress={onCommentRequest}
            onSharePress={onShareRequest}
            onMenuPress={onMenuRequest}
            onVideoPlayToggle={setIsVideoPlaying}
            onVideoMuteToggle={setIsVideoMuted}
            onFullscreenToggle={setIsFullscreen}
          />
        </Animated.View>

        {hasBlackCommentBox ? (
          <Animated.View
            style={{
              ...styles.commentBox,
              opacity: fullscreenAnimation.interpolate({
                inputRange: [0, 0.5],
                outputRange: [1, 0],
              }),
            }}
            pointerEvents="box-none"
          >
            <View style={styles.commentBoxContainer}>
              <TextInput
                placeholder="Add comment..."
                placeholderTextColor="#999"
                multiline
                value={comment}
                onChangeText={text => setComment(text)}
                style={{
                  fontSize: 14,
                  fontWeight: '400',
                  color: '#fff',
                  width: '80%'
                }}
              />
              <TouchableOpacity
                style={styles.replyButtonWrapper}
                onPress={handleSubmit}
              >
                <Text style={styles.replyButtonLabel}>Reply</Text>
              </TouchableOpacity>
            </View>
            <KeyboardSpacer />
          </Animated.View>
        ) : null}
      </View>
    </View>
    </ViewShot>
  );
}

const styles = StyleSheet.create({
  contentTile: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    backgroundColor: 'rgba(0, 0, 0, 0)',
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
  commentBox: {
    minHeight: 90,
    backgroundColor: '#222',
    zIndex: 5,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    padding: 20
  },
  commentBoxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    minHeight: 40
  },
  replyButtonWrapper: {
    marginHorizontal: 10,
  },
  replyButtonLabel: {
    color: '#49d6cf',
    fontSize: 14,
    fontWeight: '500',
    marginVertical: 3
  }
});

export default ContentTile;
