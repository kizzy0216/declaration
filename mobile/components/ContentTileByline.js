import React, {
  Fragment,
} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Constants from 'expo-constants';

const { REST_BASE_URL } = Constants.manifest.extra;

import Avatar from '~/components/Avatar';
import { hashtagRegex } from '@shared/utils/regex';

function ContentTileByline({
  creator,
  meta,
  controls,
  onCreatorPress = () => {},
  onHashtagPress = () => {},
}) {
  const hasDescription = !!(meta && meta.description);
  const theme = (
    (controls.hasImage || controls.hasVideo) ? 'light' : 'dark'
  );

  let splitDescriptionByHashtags = [];
  let matchedHashtags = [];
  if (hasDescription) {
    matchedHashtags = meta.description.match(hashtagRegex);
    splitDescriptionByHashtags = meta.description.split(hashtagRegex);
  }

  const profilePhoto = (
    creator.profile.photo
      ? creator.profile.photo
      : `${REST_BASE_URL}/avatar/${creator.uuid}`
  );

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
              imageSrc={profilePhoto}
              size="small"
            />

            <Text
              style={{
                ...styles.creatorName,
                color: (theme === 'light' ? '#FFFFFF' : '#000000'),
              }}
            >
              {creator.name}
              &nbsp;
              //
              &nbsp;
              <Text>0.0mi</Text>
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              <Text>Connected</Text>
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
                  style={{
                    ...styles.description,
                    color: (theme === 'light' ? '#FFFFFF' : '#000000'),
                  }}
                >
                  {split}
                </Text>

                {matchedHashtags && matchedHashtags[index] &&
                  <TouchableOpacity
                    key={index}
                    onPress={() => onHashtagPress(matchedHashtags[index])}
                  >
                    <Text
                      style={[
                        styles.description,
                        styles.hashtag,
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
    fontSize: 14,
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
    fontSize: 14,
    lineHeight: 14,
    paddingTop: 10,
    paddingBottom: 10,
  },
  hashtag: {
  },
  lastHashtag: {
    marginRight: 50,
  },
});

export default ContentTileByline;
