import React from 'react';
import {
  View,
  Image,
  StyleSheet,
} from 'react-native';
import Constants from 'expo-constants';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { REST_BASE_URL } = Constants.manifest.extra;

import Paragraph from '~/components/Paragraph';

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

          <Paragraph
            style={styles.heading}
            size="small"
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
    backgroundColor: 'blue',
    overflow: 'hidden',
  },
  backgroundImage: {
    backgroundColor: 'red',
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
});

export default MemberCard;
