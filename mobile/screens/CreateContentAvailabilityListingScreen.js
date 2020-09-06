import React, { useContext } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

import { CreateContentContext } from '~/contexts/CreateContentContext';
import CreateHeader from '~/components/CreateHeader';
import { IS_IOS } from '~/constants';
import TextInput from '~/components/TextInput';
import TextInputGroup from '~/components/TextInputGroup';
import CheckmarkIcon from '@shared/components/icons/CheckmarkIcon';
import isValidURL from '@shared/utils/isValidURL';

const COUNT_CREDENTIALS = 3;

function CreateContentAvailabilityListingScreen({ navigation }) {
  const {
    heading,
    body,
    availabilityListing,

    setHeading,
    setBody,
    setAvailabilityListing,
  } = useContext(CreateContentContext);

  useFocusEffect(() => {
    if (availabilityListing.credentials.length === 0) {
      setAvailabilityListing({
        ...availabilityListing,
        credentials: [...new Array(COUNT_CREDENTIALS)].map(() => ''),
      });
    } else if (availabilityListing.credentials.length > COUNT_CREDENTIALS) {
      setAvailabilityListing({
        ...availabilityListing,
        credentials: availabilityListing.credentials.slice(0, COUNT_CREDENTIALS),
      });
    } else if (availabilityListing.credentials.length < COUNT_CREDENTIALS) {
      setAvailabilityListing({
        ...availabilityListing,
        credentials: [
          ...availabilityListing.credentials,
          ...[...new Array(COUNT_CREDENTIALS - availabilityListing.credentials.length)].map(() => ''),
        ],
      });
    }
  });

  const callToActionHrefError = (
    availabilityListing.callToAction.href.length > 0
      ? isValidURL(availabilityListing.callToAction.href)
        ? ''
        : 'Invalid URL'
      : ''
  );

  const isDisabled = (
    heading.length === 0 ||
    body.length === 0 ||
    availabilityListing.credentials.length === 0 ||
    availabilityListing.credentials.filter(c => c.length === 0).length > 0 ||
    callToActionHrefError.length > 0
  );

  return (
    <SafeAreaView
      style={{flex: 1}}
      contentContainerStyle={{flex: 1}}
    >
      <CreateHeader
        heading="Add details"
        canCancel={true}
        canBack={false}
        canNext={true}
        canPost={false}
        isNextOrPostDisabled={isDisabled}
        onNextOrPost={() => navigation.navigate('CreateContentMedia')}
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
              label="Add a headline"
              placeholder="I'm available for and looking for an opportunity as an interior designer."
              value={heading}
              onChange={setHeading}
              multiline={true}
              minHeight={50}
              maxHeight={50}
            />
          </View>

          <View style={styles.row}>
            <TextInput
              label="Add body copy"
              placeholder="I’ve created, managed, and implemented every step of client projects - sourcing products and materials."
              value={body}
              onChange={setBody}
              multiline={true}
              minHeight={100}
              maxHeight={100}
            />
          </View>

          <View style={styles.row}>
            <TextInputGroup
              label="Add highlights"
              options={availabilityListing.credentials}
              renderPreInput={(_, index) => (
                <View style={{marginRight: 20}}>
                  <Text style={{fontSize: 30}}>{'\u2022 '}</Text>
                </View>
              )}
              renderPlaceholder={(option, index) => `Enter highlight ${index + 1}`}
              onChange={credentials => setAvailabilityListing({ ...availabilityListing, credentials })}
            />
          </View>

          <View style={styles.row}>
            <TextInput
              label="Add link"
              placeholder="yoursite.com"
              value={availabilityListing.callToAction.href}
              onChange={href =>
                setAvailabilityListing({
                  ...availabilityListing,
                  callToAction: {
                    ...availabilityListing.callToAction,
                    href,
                  },
                })
              }
              error={callToActionHrefError}
              autoCompleteType="off"
              autoCapitalize="none"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
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

export default CreateContentAvailabilityListingScreen;
