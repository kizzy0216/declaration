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
import ThreeDotsIcon from '@shared/components/icons/ThreeDotsIcon';

const { REST_BASE_URL } = Constants.manifest.extra;

import Avatar from '~/components/Avatar';
import { hashtagRegex } from '@shared/utils/regex';

function ContentTileByline({
  creator,
  meta,
  controls,
  onCreatorPress = () => {},
  onHashtagPress = () => {},
  onMenuPress = () => {},
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
            onPress={() => onCreatorPress(creator)}
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
              {creator.name.length > 15 ? creator.name.substring(0, 15) + '...' : creator.name}
            </Text>
          </TouchableOpacity>
        }
        <View style={styles.actionBox}>
          <TouchableOpacity>
            <Text
              style={{
                ...styles.followButton,
                color: (theme === 'light' ? '#fff' : '#222')
              }}
            >
              Connect
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginLeft: 10, paddingHorizontal: 10, paddingVertical: 10}}
            onPress={() => onMenuPress()}
          >
            <ThreeDotsIcon fill={theme === 'light' ? '#fff' : '#222'} />
          </TouchableOpacity>
        </View>
      </View>
      {hasDescription &&
        <View style={styles.descriptionContainer}>
          <View>
            <Text
              style={[
                styles.description,
                styles[theme],
              ]}
              numberOfLines={3}
              ellipsizeMode="tail"
            >
              {meta.description}
            </Text>
          </View>
          {/* <ScrollView
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
                        styles[theme],
                      ]}
                    >
                      {matchedHashtags[index]}
                    </Text>
                  </TouchableOpacity>
                }
              </Fragment>
            ))}
          </ScrollView> */}
        </View>
      }
    </>
  );
}

const styles = StyleSheet.create({
  byline: {
    paddingLeft: 30,
    paddingRight: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  creator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 0,
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
    lineHeight: 16,
    paddingTop: 5,
  },
  hashtag: {
  },
  lastHashtag: {
    marginRight: 50,
  },
  light: {
    color: 'white',
  },
  dark: {
    color: 'black',
  },

  actionBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5
  },
  followButton: {
    fontWeight: 'bold',
    fontSize: 14,
    opacity: 0.5
  }
});

export default ContentTileByline;
