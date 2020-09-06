import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
} from 'react-native';
import { Video } from 'expo-av';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { WINDOW_WIDTH, GRAY } from '~/constants';

function ContentTemplateCard({
  heading,
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
      <Text style={styles.heading}>
        {heading}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  contentTemplateCard: {
    position: 'relative',
    overflow: 'visible',
    width: WINDOW_WIDTH / 2.05,
    aspectRatio: 180/287,
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
  heading: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 12,
    fontWeight: '600',
    color: GRAY,
  },
});

export default ContentTemplateCard;
