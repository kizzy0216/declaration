import React, { useMemo, useState, useContext, useCallback } from 'react';
import {
  View,
  TextInput,
  Text,
  ScrollView,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from 'urql';
import { useFocusEffect } from '@react-navigation/native';
import GetNetworkUsers from '~/queries/GetNetworkUsers';
// import ScreenHeader from '~/components/ScreenHeader';
import { NetworkContext } from '~/contexts/NetworkContext';
import { UserContext } from '~/contexts/UserContext';
import { ContentTilePagerContext } from '~/contexts/ContentTilePagerContext';
import SearchIcon from '@shared/components/icons/SearchIcon';
// import OtherIcon from '@shared/components/icons/FilterIcon';
import mapUser from '@shared/mappings/mapUser';
import ContentCard from '~/components/ContentCard';
import MemberCard from '~/components/MemberCard';
import {
  LIGHT_GRAY,
} from '~/constants';
import SearchContentScroller from '../components/SearchContentScroller';
import SearchContentItem from '../components/SearchContentItem';
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import SearchFilterModal from '../components/SearchFilterModal';
import { useNavigation } from '@react-navigation/native';

function UserContentList({user}) {
  
  const navigation = useNavigation();
  const [contentList, setContentList] = useState();
  const { getItems, itemUuids: postIds, items: posts } = useContext(ContentTilePagerContext);
  
  useFocusEffect(useCallback(() => {
    getItems();
  }, []));

  const mappedPosts = useMemo(() => {
    return postIds.map((uuid) => posts[uuid]);
  }, [postIds]);

  React.useEffect(() => {
      let postData = mappedPosts
      if (user && user.uuid) {
        postData = postData.filter(x => x.creator && x.creator.uuid === user.uuid)
      }
      setContentList(postData)
  }, [user, mappedPosts]);
  
  return (
    <View style={styles.profileContentContainer}>
      <View style={styles.container}>
        {contentList && contentList.length === 0 ? 
          <View style={{width: '100%', flexDirection: 'row', justifyContent: 'center'}}>
            <Text>No posts added to the network yet</Text>
          </View>
        : <></>}
        {contentList && contentList.map((post, index) => (
          <View key={index} style={{marginHorizontal: 8, marginBottom: 16}}>
          <ContentCard
            content={post}
            onPress={({uuid}) =>  navigation.navigate('ContentViewer', {
              heading: `${user && user.name ? user.name.split(' ')[0] : 'User'}'s Posts`,
              activeIndex: contentList.map(x => x.uuid).indexOf(uuid),
              filters: {
                creator_uuid: user && user.uuid ? user.uuid : ''
              }
            })}
          />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileContentContainer: {
    backgroundColor: 'white',
    overflow: 'visible',
  },
  container: {
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
    justifyContent: 'center'
    // paddingRight: 20,
    // paddingLeft: 20,
  },
});

export default UserContentList;
