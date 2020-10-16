import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text
} from 'react-native';
import Constants from 'expo-constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';

import Paragraph from '~/components/Paragraph';
import { WINDOW_WIDTH, LIGHT_GRAY } from '~/constants';
import ContentTileForegroundPoll from './ContentTileForegroundPoll';

function ContentCard({
  content,
  onPress = () => {},
}) {
  // console.log('content poll', content.poll)
  return (
    <TouchableOpacity
      onPress={() => onPress({ uuid: content.uuid })}
      containerStyle={{overflow: 'visible'}}
    >
      <View style={styles.contentTemplateCard}>
        <View style={styles.memberContainer}>
          {content.media && content.media.uri ?
            <View style={{}}>
              <Image
                source={{uri: content.media.uri}}
                resizeMode={'cover'}
                style={{
                  borderRadius: 32,
                  width: '100%',
                  height: '100%'
                }}
              ></Image>
              {content.meta && content.meta.description ? 
                <Text
                  style={[styles.heading, { 
                    position: 'absolute',
                    alignSelf: 'center',
                    transform: [{ scale: .5 }] }]}
                  >
                  {content.meta.description}
              </Text> : <></> }
            </View>
          : <></>
          }
          <View style={{transform: [{ scale: 0.4 }, { translateX: -80 }, { translateY: -20 }]}}>
            {content.heading ? <View style={{width: 280}}>
              <Paragraph
                style={styles.heading}
                size="huge"
                >
                {content.heading}
              </Paragraph>
            </View> : <></> }
            {content.poll 
              ? <View style={{ }}>
                  <ContentTileForegroundPoll
                    poll={content.poll}
                    pollStyle={{shadowOpacity: 0, borderWidth: 1, borderColor: '#F0F0F0', width: 280, flexWrap: 'nowrap', marginTop: 0}}
                    onSelect={() => onPress({uuid: content.uuid})}
                  />
                </View>
              : <></>
            }
          </View>
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
