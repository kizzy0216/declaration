import React, {
  useState,
  useContext,
  useEffect,
} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  KeyboardAvoidingView,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import ConnectionsModalContainer from '~/containers/ConnectionsModalContainer';
import { CreateContentContext } from '~/contexts/CreateContentContext';
import { ContentTilePagerContext } from '~/contexts/ContentTilePagerContext';
import CreateHeader from '~/components/CreateHeader';
import TextInput from '~/components/TextInput';
import Button from '~/components/Button';
import Picker from '~/components/Picker';
import { IS_IOS } from '~/constants';

const NETWORK_REACH = 'NETWORK_REACH';
const CONNECTIONS_REACH = 'CONNECTIONS_REACH';
const PRIVATE_REACH = 'PRIVATE_REACH';

const REACH_OPTIONS = [
  {
    label: 'Network',
    value: NETWORK_REACH,
  },
  {
    label: 'Connections only',
    value: CONNECTIONS_REACH,
  },
  {
    label: 'Private to me',
    value: PRIVATE_REACH,
  },
];

function CreateContentMetaScreen({ navigation }) {
  const [isConnectionsModalActive, setIsConnectionsModalActive] = useState(false);
  const {
    meta,
    setMeta,
    create,
    isCreating,
  } = useContext(CreateContentContext);
  const [selectedReach, setSelectedReach] = useState(NETWORK_REACH);
  const { scrollToIndex } = useContext(ContentTilePagerContext);

  const isDisabled = (false);

  function handleConnectionsSubmit({ selected }) {
    setMeta({
      ...meta,
      mentions: selected,
    });
  }

  function handlePost() {
    create().then(() => {
      scrollToIndex({ index: 0, withAnimation: false });
      navigation.navigate('Feed');
    });
  }

  return (
    <>
      <ConnectionsModalContainer
        initialSelected={meta.mentions.map(({ uuid }) => uuid)}
        isVisible={isConnectionsModalActive}
        onSubmit={handleConnectionsSubmit}
        onClose={() => setIsConnectionsModalActive(false)}
      />

      <SafeAreaView
        style={{flex: 1}}
        contentContainerStyle={{flex: 1}}
      >
        <CreateHeader
          heading="Details"
          canCancel={false}
          canBack={true}
          canNext={false}
          canPost={true}
          isNextOrPostDisabled={isDisabled}
          isFetching={isCreating}
          onNextOrPost={handlePost}
          onCancelOrBack={() => navigation.goBack()}
        />
        <KeyboardAvoidingView
          behavior={IS_IOS ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView
            style={{flex: 1}}
            contentContainerStyle={styles.contentContainer}
          >
            <View style={styles.row}>
              <TextInput
                multiline={true}
                minHeight={75}
                maxHeight={75}
                label="Additional description and hashtags"
                placeholder="Describe your post"
                value={meta.description}
                onChange={description => setMeta({ ...meta, description })}
                inputFooter={
                  <Button
                    theme="tertiary"
                    size="small"
                    label="#hashtags"
                    buttonStyle={{
                      width: 120,
                    }}
                  />
                }
              />
            </View>

            <View style={styles.row}>
              <TouchableOpacity
                containerStyle={{
                  overflow: 'visible',
                }}
                onPress={() => setIsConnectionsModalActive(true)}
              >
                <TextInput
                  multiline={true}
                  minHeight={80}
                  maxHeight={80}
                  label="Request member feedback"
                  placeholder="@mention"
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={false}
                  pointerEvents="none"
                  value={meta.mentions.map(({ profile }) => '@' + profile.username).join(' ')}
                  onChange={() => {}}
                  inputFooter={
                    <Button
                      theme="tertiary"
                      size="small"
                      label="@connections"
                      buttonStyle={{
                        width: 140,
                      }}
                      onPress={() => setIsConnectionsModalActive(true)}
                    />
                  }
                />
              </TouchableOpacity>
            </View>

            {/* <View style={styles.row}> */}
            {/*   <Picker */}
            {/*     label="Who can view" */}
            {/*     value={selectedReach} */}
            {/*     onChange={setSelectedReach} */}
            {/*     options={REACH_OPTIONS} */}
            {/*   /> */}
            {/* </View> */}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    paddingTop: 30,
    paddingRight: 30,
    paddingLeft: 30,
    paddingBottom: 100,
  },
  row: {
    marginBottom: 30,
  },
});

export default CreateContentMetaScreen;
