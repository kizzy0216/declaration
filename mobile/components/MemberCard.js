import React from 'react';
import {
  View,
  Image,
  StyleSheet,
} from 'react-native';
import Constants from 'expo-constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';

const { REST_BASE_URL } = Constants.manifest.extra;

import Paragraph from '~/components/Paragraph';
import { LIGHT_GRAY } from '~/constants';

function MemberCard({
  uuid,
  name,
  profile: {
    photo,
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
    >
      <View style={styles.memberCard}>
        <View style={styles.container}>
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
            {name}
          </Paragraph>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 17,
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    overflow: 'hidden',
  },
  backgroundImage: {
    backgroundColor: LIGHT_GRAY,
    width: '100%',
    aspectRatio: 1.5,
  },
  heading: {
    position: 'absolute',
    color: 'white',
    fontWeight: 'bold',
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: 100,
  },
});

export default MemberCard;
