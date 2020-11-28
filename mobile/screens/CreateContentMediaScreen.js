import React, { useState, useContext } from 'react';
import {
  StyleSheet, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CreateContentContext } from '~/contexts/CreateContentContext';
import CreateHeader from '~/components/CreateHeader';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { IS_IOS } from '~/constants';
import AnimatedSpinnerIcon from '~/components/AnimatedSpinnerIcon';


function CreateContentMediaScreen({ navigation, route }) {
  const {
    isJustImage = false,
    isJustVideo = false,
    nextScreenName = 'CreateContentMeta',
  } = route.params || {};
  
  const {
    setMedia,
  } = useContext(CreateContentContext);
  React.useEffect(() => {
    const getNativeImages = async () => {
      if (IS_IOS) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to select a photo.');
          navigation.goBack()
        }
      }

      try {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: isJustImage ? ImagePicker.MediaTypeOptions.Images : (
            isJustVideo ? ImagePicker.MediaTypeOptions.Videos : ImagePicker.MediaTypeOptions.All),
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.25,
          videoExportPreset: ImagePicker.VideoExportPreset.H264_640x480
        });

        if (!result.cancelled) {
          const media = {
            localAsset: {...result}
          }
          setMedia(media);
          navigation.navigate(nextScreenName)
        } else {
          navigation.goBack()
        }
      } catch (error) {
        console.error(error);
      }
    }
    getNativeImages()
  }, []);


  return (
    
    <SafeAreaView
      style={{flex: 1}}
      edges={['top', 'left', 'right']}
      contentContainerStyle={{flex: 1}}
    >
      <CreateHeader
        heading="Add media"
        canCancel={true}
        canBack={true}
        canNext={false}
        canPost={false}
        isNextOrPostDisabled={true}
        onNextOrPost={() => {}}
        onCancelOrBack={() => navigation.goBack()}
      />
      <View style={{paddingVertical: 40, flexDirection: 'row', justifyContent: 'center'}}>
        <AnimatedSpinnerIcon
          width={16}
          height={16}
          fill={'#000000'}
          />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingLeft: 30,
    paddingRight: 30,
  },
  row: {
    marginBottom: 30,
  },
});

export default CreateContentMediaScreen;
