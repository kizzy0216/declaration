import React, {
  useState,
} from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMutation } from 'urql';
import { StackActions } from '@react-navigation/native';

import NetworkAccessRequestForm from '~/components/NetworkAccessRequestForm';
import DisplayHeading from '~/components/DisplayHeading';
import InsertNetworkAccessRequest from 'Shared/mutations/InsertNetworkAccessRequest';
import Button from '~/components/Button';
import { IS_IOS } from '~/constants';

function NetworkAccessRequestScreen({ navigation }) {
  const [
    insertNetworkRequestResult,
    insertNetworkRequest,
  ] = useMutation(InsertNetworkAccessRequest);
  const {
    fetching: isFetching,
    error,
    data,
  } = insertNetworkRequestResult;

  function handleSubmit({
    name,
    email,
    communityName,
    userCountRange,
    body,
  }) {
    insertNetworkRequest({
      requester_name: name,
      requester_email: email,
      community_name: communityName,
      user_count_range: userCountRange,
      body,
    }).then(() => {
      navigation.dispatch(
        StackActions.replace('NetworkAccessRequestFeedback')
      )
    });
  }

  return (
    <KeyboardAvoidingView
      behavior={IS_IOS ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.headingWrapper}>
            <DisplayHeading style={styles.heading}>
              Do you want to create your own space?
            </DisplayHeading>
          </View>

          <View style={styles.subHeadingWrapper}>
            <Text style={styles.subHeading}>
              Declaration is a fluid, dynamic and ever-evolving private
              networking platform.
            </Text>
            <Text style={[styles.subHeading, styles.lastSubHeading]}>
              Fill out the form below and a representative will contact you about
              the status of your new space soon.
            </Text>
          </View>

          <NetworkAccessRequestForm
            isFetching={isFetching}
            onSubmit={handleSubmit}
          />
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingRight: 20,
    paddingBottom: 100,
    paddingLeft: 20,
  },
  headingWrapper: {
    marginBottom: 40,
  },
  subHeadingWrapper: {
  },
  subHeading: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    width: 250,
  },
  lastSubHeading: {
    width: 300,
  },
  row: {
    marginBottom: 20,
  },
});

export default NetworkAccessRequestScreen;
