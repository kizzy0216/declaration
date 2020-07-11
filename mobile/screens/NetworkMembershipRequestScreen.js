import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  useQuery,
  useMutation,
} from 'urql';
import { StackActions } from '@react-navigation/native';

import Button from '~/components/Button';
import DisplayHeading from '~/components/DisplayHeading';
import NetworkMembershipRequestForm from '~/components/NetworkMembershipRequestForm';
import GetNetworkByUuid from '~/queries/GetNetworkByUuid';
import InsertNetworkMembershipRequestOne from '~/mutations/InsertNetworkMembershipRequestOne';
import { UserContext } from '~/contexts/UserContext';

function NetworkMembershipRequestScreen({ route, navigation }) {
  const { user } = useContext(UserContext);
  const { params = {} } = route;
  const [getNetworkResult] = useQuery({
    query: GetNetworkByUuid,
    variables: {
      uuid: params.networkUuid,
    },
  });
  const [response, insertMembershipRequest] = useMutation(InsertNetworkMembershipRequestOne);

  function handleSubmit({ body }) {
    insertMembershipRequest({
      network_uuid: params.networkUuid,
      user_uuid: user.uuid,
      body,
    }).then(() => {
      navigation.dispatch(
        StackActions.replace('NetworkMembershipRequestFeedback')
      )
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>
        {getNetworkResult.data && getNetworkResult.data.network_by_pk.name}
      </Text>

      <DisplayHeading style={styles.heading}>
        Unfortunately you're not on our invite list.
      </DisplayHeading>

      <Text style={styles.subHeading}>
        Fill out the fields below and we will send a request to that network
        admin letting them know you want to join.
      </Text>

      <NetworkMembershipRequestForm onSubmit={handleSubmit} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  heading: {
    paddingTop: 50,
    width: 300,
  },
  subHeading: {
    fontSize: 16,
    lineHeight: 24,
    width: 315,
    marginBottom: 50,
  },
});

export default NetworkMembershipRequestScreen;
