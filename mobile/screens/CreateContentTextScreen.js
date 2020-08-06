import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CreateHeader from '~/components/CreateHeader';
import TextInput from '~/components/TextInput';

function CreateContentTextScreen({ navigation, route }) {
  const { withMedia } = route.params || {};

  const [text, setText] = useState('');

  return (
    <SafeAreaView style={{flex: 1}}>
      <CreateHeader
        heading="Add text"
        canCancel={true}
        canBack={false}
        canNext={true}
        canPost={false}
        isNextOrPostDisabled={text === ''}
        onNextOrPost={() => navigation.navigate(withMedia ? 'CreateContentMedia' : 'CreateContentMeta')}
        onCancelOrBack={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <TextInput
          multiline={true}
          minHeight={100}
          maxHeight={150}
          label="Add your question or idea"
          placeholder="Be specific with your idea or question"
          value={text}
          onChange={setText}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingRight: 30,
    paddingLeft: 30,
  },
});

export default CreateContentTextScreen;
