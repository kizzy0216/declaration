import React, { useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { InterfaceContext } from '~/contexts/InterfaceContext';
import Avatar from '~/components/Avatar';

function ContentTileByline({
  creator,
  meta,
  onCreatorPress = () => {},
  onHashtagPress = () => {},
}) {
  const { theme } = useContext(InterfaceContext);

  return (
    <>
      <View
        style={styles.byline}
        pointerEvents="box-none"
      >
        {creator &&
          <TouchableOpacity
            style={styles.creator}
            onPress={onCreatorPress}
          >
            <Avatar
              imageSrc={creator.profile.photo}
              size="small"
            />

            <Text
              style={[
                styles.creatorName,
                styles[theme],
              ]}
            >
              {creator.name}
            </Text>
          </TouchableOpacity>
        }
      </View>
      {meta && meta.hashtags &&
        <ScrollView
          style={styles.hashtags}
          horizontal={true}
          pointerEvents="box-none"
          showsHorizontalScrollIndicator={false}
        >
          {meta.hashtags.map((hashtag, index) => (
            <TouchableOpacity
              key={hashtag.text}
              onPress={() => onHashtagPress(hashtag)}
            >
              <Text
                style={[
                  styles.hashtag,
                  styles[theme],
                  index === meta.hashtags.length - 1 && styles.lastHashtag,
                ]}
              >
                {hashtag.text}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      }
    </>
  );
}

const styles = StyleSheet.create({
  byline: {
    paddingLeft: 25,
    paddingRight: 30,
    flexDirection: 'row',
  },
  creator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 3,
  },
  creatorName: {
    fontSize: 12,
    paddingRight: 5,
    paddingLeft: 5,
  },
  hashtagsWrapper: {
    width: '100%',
  },
  hashtags: {
    flexDirection: 'row',
    paddingLeft: 20,
  },
  hashtag: {
    fontSize: 12,
    lineHeight: 12,
    paddingTop: 10,
    paddingRight: 5,
    paddingBottom: 10,
    paddingLeft: 5,
  },
  lastHashtag: {
    marginRight: 50,
  },
  dark: {
    color: 'black',
  },
  light: {
    color: 'white',
  },
});

export default ContentTileByline;
