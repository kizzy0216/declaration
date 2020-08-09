import React from 'react';
import {
  View,
  StyleSheet,
  Image,
} from 'react-native';
import { Video } from 'expo-av';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { WINDOW_WIDTH } from '~/constants';

function ContentTemplateCard({
  imageSource,
  videoSource,
  onPress = () => {},
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      containerStyle={{
        overflow: 'visible',
      }}
    >
      <View style={styles.contentTemplateCard}>
        {imageSource &&
          <Image
            source={imageSource}
            resizeMode="cover"
            style={styles.image}
          />
        }

        {videoSource &&
          <Video
            source={videoSource}
            resizeMode="cover"
            style={{
              ...styles.video,
            }}
            shouldPlay={true}
            isMuted={true}
            isLooping={true}
          />
        }
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  contentTemplateCard: {
    position: 'relative',
    overflow: 'visible',
    width: WINDOW_WIDTH / 1.8,
    aspectRatio: 155/245,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 30,
    elevation: 20,
  },
  image: {
    borderRadius: 33,
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 2,
  },
  video: {
    borderRadius: 33,
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
});

export default ContentTemplateCard;
