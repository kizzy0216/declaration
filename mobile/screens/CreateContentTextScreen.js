import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CreateHeader from '~/components/CreateHeader';
import TextInput from '~/components/TextInput';
import { CreateContentContext } from '~/contexts/CreateContentContext';

function CreateContentTextScreen({ navigation, route }) {
  const { withMedia } = route.params || {};
  const {
    heading,
    setHeading,
    setType,
  } = useContext(CreateContentContext);

  const isDisabled = (heading === '');

  return (
    <SafeAreaView style={{flex: 1}}>
      <CreateHeader
        heading="Add text"
        canCancel={true}
        canBack={false}
        canNext={true}
        canPost={false}
        isNextOrPostDisabled={isDisabled}
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
          value={heading}
          onChange={setHeading}
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
