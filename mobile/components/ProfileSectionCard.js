import React from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

function ProfileSectionCard({
  heading,
  isEditable = false,
  onPress = () => {},
  children,
}) {
  const cardElement = (
    <View style={styles.profileSectionCard}>
      <View style={styles.container}>
        <View style={styles.headingWrapper}>
          <Text style={styles.heading}>
            {heading}
          </Text>
        </View>

        <View style={styles.childrenWrapper}>
          {children}
        </View>
      </View>
    </View>
  );

  if (isEditable) {
    return (
      <TouchableOpacity
        onPress={onPress}
        containerStyle={{overflow: 'visible'}}
      >
        {cardElement}
      </TouchableOpacity>
    );
  }

  return cardElement;
}

const styles = StyleSheet.create({
  profileSectionCard: {
    backgroundColor: 'white',
    borderRadius: 23,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 40,
    elevation: 20,
    overflow: 'visible',
  },
  container: {
    paddingTop: 25,
    paddingRight: 20,
    paddingBottom: 35,
    paddingLeft: 20,
  },
  headingWrapper: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 30,
    lineHeight: 35,
    fontFamily: 'Orpheus',
  },
});

export default ProfileSectionCard;
