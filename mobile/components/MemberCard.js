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

const { REST_BASE_URL } = Constants.manifest.extra;

import Paragraph from '~/components/Paragraph';
import { WINDOW_WIDTH, LIGHT_GRAY } from '~/constants';

function MemberCard({
  uuid,
  name,
  profile: {
    photo,
    username
  },
  onPress = () => {},
}) {
  const imageSrc = (
    photo && photo.length > 0
    ? photo
    : `${REST_BASE_URL}/avatar/${uuid}`
  );
  return (
    <TouchableOpacity
      onPress={() => onPress({ uuid })}
      containerStyle={{overflow: 'visible'}}
    >
      <View style={styles.contentTemplateCard}>
        <View style={styles.memberContainer}>
          <Image
            style={styles.backgroundImage}
            source={{ uri: imageSrc }}
          />

          <LinearGradient
            colors={['rgba(0,0,0,0)','rgba(0,0,0,0.4)']}
            style={styles.gradient}
          />

          <Paragraph
            style={styles.heading}
            size="huge"
          >
            {name.split(' ')[0]}
          </Paragraph>
          <Text style={[styles.heading, styles.subheading]}>
            {`@${username}`}
          </Text>
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
    aspectRatio: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 30,
    elevation: 20,
  },
  memberContainer: {
    borderRadius: 32,
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    overflow: 'hidden',
  },
  backgroundImage: {
    backgroundColor: LIGHT_GRAY,
    width: '100%',
    aspectRatio: 1,
  },
  heading: {
    position: 'absolute',
    color: 'white',
    fontWeight: 'bold',
    paddingBottom: 24,
    paddingLeft: 24,
    paddingRight: 24,
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

export default MemberCard;
