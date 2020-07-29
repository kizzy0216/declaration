import React, { useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from 'urql';

import GetNetworkUsers from '~/queries/GetNetworkUsers';
import ScreenHeader from '~/components/ScreenHeader';
import { NetworkContext } from '~/contexts/NetworkContext';
import { UserContext } from '~/contexts/UserContext';
import mapUser from 'Shared/mappings/mapUser';
import MemberCard from '~/components/MemberCard';

function MembersScreen({ navigation }) {
  const { user } = useContext(UserContext);
  const { activeNetwork } = useContext(NetworkContext);

  const [
    getUsersResult,
    getUsers,
  ] = useQuery({
    query: GetNetworkUsers,
    variables: {
      network_uuid: activeNetwork.uuid,
      not_user_uuid: user.uuid,
    },
    pause: !activeNetwork.uuid,
  });

  const {
    data,
    fetching: isFetching,
  } = getUsersResult;

  let items = [];
  if (!isFetching) {
    items = data
      .network_user
      .map(({ user }) => mapUser(user))
  }

  function handleRefresh() {
    getUsers({ requestPolicy: 'network-only' });
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScreenHeader
        heading="Members"
        onClose={() => navigation.goBack()}
      />
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={handleRefresh}
          />
        }
      >
        {items.map((item) => (
          <View
            style={styles.memberCardWrapper}
            key={item.uuid}
          >
            <MemberCard
              {...item}
              onPress={
                ({ uuid }) => navigation.navigate('Profile', { uuid })
              }
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingRight: 20,
    paddingLeft: 20,
  },
  memberCardWrapper: {
    marginBottom: 20,
  },
});

export default MembersScreen;
