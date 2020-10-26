import React from 'react';
import {
  View,
  Image,
  StyleSheet
} from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { Video } from 'expo-av';

import Paragraph from '~/components/Paragraph';
import { WINDOW_WIDTH, LIGHT_GRAY } from '~/constants';

function ContentCard({
  content,
  onPress = () => {},
}) {
  const thumbnail = React.useMemo(() => {
    if (content.screenshot) {
      return <Image
        source={{uri: content.screenshot}}
        resizeMode={'cover'}
        style={{
          borderRadius: 32,
          width: '100%',
          height: '100%'
        }}
      />
    }
    if (content.media && content.media.uri && (
        content.media.uri.indexOf('.mp4') > 0 || content.media.uri.indexOf('.mov') > 0 )) {
      return <Video
        source={content.media}
        resizeMode="cover"
        shouldPlay={true}
        isMuted={true}
        isLooping={false}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    }
    if (content.media && content.uri) {
      return <Image
        source={{uri: content.uri}}
        resizeMode={'cover'}
        style={{
          borderRadius: 32,
          width: '100%',
          height: '100%'
        }}
      />
    }
    return <View style={{width: 280}}>
      <Paragraph
        style={styles.heading}
        size="huge"
        >
        {content.heading}
      </Paragraph>
    </View> 
  }, [content])

  return (
    <TouchableOpacity
      onPress={() => onPress({ uuid: content.uuid })}
      containerStyle={{overflow: 'visible'}}
    >
      <View style={styles.contentTemplateCard}>
        <View style={styles.memberContainer}>
          {thumbnail}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  contentTemplateCard: {
    position: 'relative',
    overflow: 'visible',
    width: WINDOW_WIDTH / 2.65,
    flex: 1
  },
  memberContainer: {
    borderRadius: 32,
    aspectRatio: 1/1.4,
    width: '100%',
    // borderColor: 'blue',
    // borderWidth: 1
    backgroundColor: '#FFF',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  backgroundImage: {
    backgroundColor: LIGHT_GRAY,
    width: '100%',
    aspectRatio: 1,
  },
  title: {
    color: 'black',
    fontSize: 16,
    marginHorizontal: 16,
    backgroundColor: '#FFF',
    padding: 4,
    lineHeight: 22
  },
  heading: {
    color: 'black',
    fontSize: 18,
    backgroundColor: '#FFF',
    padding: 6,
    margin: 0,
  },
  subheading: {
    fontSize: 14,
    lineHeight: 14,
    paddingBottom: 8,
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: 100,
  },
});

export default ContentCard;
