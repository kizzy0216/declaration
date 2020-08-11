import React, { Fragment, useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { InterfaceContext } from '~/contexts/InterfaceContext';
import Avatar from '~/components/Avatar';
import { hashtagRegex } from '@shared/utils/regex';

function ContentTileByline({
  creator,
  meta,
  onCreatorPress = () => {},
  onHashtagPress = () => {},
}) {
  const { theme } = useContext(InterfaceContext);

  const hasDescription = meta && meta.description;

  let splitDescriptionByHashtags = [];
  let matchedHashtags = [];
  if (hasDescription) {
    matchedHashtags = meta.description.match(hashtagRegex);
    splitDescriptionByHashtags = meta.description.split(hashtagRegex);
  }

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
              {creator.name} // 0.0mi
            </Text>
          </TouchableOpacity>
        }
      </View>
      {hasDescription &&
        <View style={styles.descriptionContainer}>
          <ScrollView
            style={styles.descriptionScrollView}
            horizontal={true}
            pointerEvents="box-none"
            showsHorizontalScrollIndicator={false}
          >
            {splitDescriptionByHashtags.map((split, index) => (
              <Fragment key={index}>
                <Text
                  style={[
                    styles.description,
                    styles[theme],
                  ]}
                >
                  {split}
                </Text>

                {matchedHashtags[index] &&
                  <TouchableOpacity
                    key={index}
                    onPress={() => onHashtagPress(matchedHashtags[index])}
                  >
                    <Text
                      style={[
                        styles.description,
                        styles.hashtag,
                        styles[theme],
                        index === matchedHashtags.length - 1 && styles.lastHashtag,
                      ]}
                    >
                      {matchedHashtags[index]}
                    </Text>
                  </TouchableOpacity>
                }
              </Fragment>
            ))}
          </ScrollView>
        </View>
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
    fontWeight: '600',
    paddingRight: 5,
    paddingLeft: 5,
  },
  descriptionContainer: {
    width: '100%',
    paddingLeft: 30,
    paddingRight: 30,
  },
  descriptionScrollView: {
    flexDirection: 'row',
  },
  description: {
    fontSize: 12,
    lineHeight: 12,
    paddingTop: 10,
    paddingBottom: 10,
  },
  hashtag: {
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
