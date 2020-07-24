import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import Avatar from '~/components/Avatar';
import {
  IS_IOS,
} from '~/constants';

function AvatarPicker({
  user,
  photo,
  onChange = () => {},
}) {
  const [localPhoto, setLocalPhoto] = useState(null);

  useEffect(() => {
    if (IS_IOS) {
      Permissions.askAsync(Permissions.CAMERA_ROLL).then(({ status }) => {
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      });

      return () => {};
    }
  }, []);

  const handlePress = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
        base64: true,
      });

      if (!result.cancelled) {
        setLocalPhoto(`data:image/jpeg;base64,${result.base64}`);
        onChange(result);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.avatarPicker}>
      <Avatar
        name={user.name}
        imageSrc={(
          localPhoto
            ? localPhoto
            : photo
        )}
        size="large"
        theme="secondary"
        isTouchable={true}
        onPress={handlePress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  avatarPicker: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 100,
  },
});

export default AvatarPicker;
