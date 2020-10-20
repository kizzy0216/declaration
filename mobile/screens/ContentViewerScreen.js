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
import { NetworkContext } from '~/contexts/NetworkContext';
import { ContentTilePagerContext } from '~/contexts/ContentTilePagerContext';
import mapUser from '@shared/mappings/mapUser';
import ContentTilePager from '../components/ContentTilePager';
import AnimatedHeader from '../components/AnimatedHeader';

function ContentViewerScreen({ navigation, route }) {

  const { heading, activeIndex } = route.params;

  const { activeNetwork } = useContext(NetworkContext);
  const { scrollToIndex } = useContext(ContentTilePagerContext);

  React.useEffect(() => {
    scrollToIndex({ index: activeIndex, withAnimation: false, viewPosition: 0 })
  }, [activeIndex]);

  // console.log('Active index', activeIndex)
  // const [
  //   getUsersResult,
  //   getUsers,
  // ] = useQuery({
  //   query: GetNetworkUsers,
  //   variables: {
  //     network_uuid: activeNetwork.uuid,
  //     not_user_uuid: user.uuid,
  //   },
  //   pause: !activeNetwork.uuid,
  // });

  // const {
  //   data,
  //   fetching: isFetching,
  // } = getUsersResult;

  // let items = [];
  // if (!isFetching) {
  //   items = data
  //     .network_user
  //     .map(({ user }) => mapUser(user))
  // }

  // function handleRefresh() {
  //   getUsers({ requestPolicy: 'network-only' });
  // }

  return (
    <View style={styles.screen}>
      <SafeAreaView
        style={styles.safeArea}
        contentContainerStyle={styles.contentContainer}
      >
        <AnimatedHeader 
          heading={heading || 'Posts'}
        />
      </SafeAreaView>
      <View style={styles.pagerWrapper}>
        <ContentTilePager />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    position: 'relative',
  },
  safeArea: {
    position: 'absolute',
    width: '100%',
    zIndex: 2,
  },
  contentContainer: {
    flex: 1,
  },
  pagerWrapper: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  contentTilePager: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    paddingTop: 20,
    paddingRight: 20,
    paddingLeft: 20,
  },
  memberCardWrapper: {
    marginBottom: 20,
  },
});

export default ContentViewerScreen;
