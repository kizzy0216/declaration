import React, {
  useState,
  useEffect,
  useRef,
} from 'react';
import {
  Animated,
  View,
  StyleSheet,
} from 'react-native';
import { BlurView } from 'expo-blur';

import PlayIcon from '@shared/components/icons/PlayIcon';
import PauseIcon from '@shared/components/icons/PauseIcon';
import AudioIcon from '@shared/components/icons/AudioIcon';
import NoAudioIcon from '@shared/components/icons/NoAudioIcon';
import {
  FEEDBACK_PLAYED_VIDEO,
  FEEDBACK_PAUSED_VIDEO,
} from '~/constants';

const ICON_SIZE = 40;
const FILL = 'rgba(255, 255, 255, 0.4)';

function ContentTileFeedback({
  isActive = false,
  type = '',
}) {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: (isActive ? 1 : 0),
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isActive]);

  return (
    <Animated.View
      style={{
        opacity: animation,
      }}
      pointerEvents="box-none"
    >
      <BlurView
        intensity={100}
        style={styles.feedback}
      >
        <View style={styles.container}>
          {type === FEEDBACK_PLAYED_VIDEO ? (
            <PlayIcon
              width={ICON_SIZE}
              height={ICON_SIZE}
              fill={FILL}
            />
          ) : type === FEEDBACK_PAUSED_VIDEO ? (
            <PauseIcon
              width={ICON_SIZE}
              height={ICON_SIZE}
              fill={FILL}
            />
          ) : null}
        </View>
      </BlurView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  feedback: {
    width: 80,
    height: 80,
    borderRadius: 17,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
});

export default ContentTileFeedback;
