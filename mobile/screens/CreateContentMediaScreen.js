import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CreateHeader from '~/components/CreateHeader';
import { IS_IOS } from '~/constants';
import MediaLibraryPickerContainer from '~/containers/MediaLibraryPickerContainer';

function CreateContentMediaScreen({ navigation, route }) {
  const {
    isJustImage = false,
    isJustVideo = false,
    nextScreenName = 'CreateContentMeta',
  } = route.params || {};
  const isDisabled = (false);
  const canCancel = (isJustImage || isJustVideo);

  function handleMediaSelect(asset) {
  }

  return (
    <SafeAreaView
      style={{flex: 1}}
      edges={['top', 'left', 'right']}
      contentContainerStyle={{flex: 1}}
    >
      <CreateHeader
        heading="Add media"
        canCancel={canCancel}
        canBack={!canCancel}
        canNext={true}
        canPost={false}
        isNextOrPostDisabled={isDisabled}
        onNextOrPost={() => navigation.navigate(nextScreenName)}
        onCancelOrBack={() => navigation.goBack()}
      />
      <KeyboardAvoidingView
        behavior={IS_IOS ? 'padding' : 'height'}
        style={{flex: 1}}
      >
        <View style={styles.container}>
          <MediaLibraryPickerContainer
            isJustImage={isJustImage}
            isJustVideo={isJustVideo}
            onChange={handleMediaSelect}
          />
        </View>
      </KeyboardAvoidingView>
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
