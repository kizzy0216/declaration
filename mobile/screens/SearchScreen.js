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
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import SearchFilterModal from '../components/SearchFilterModal';

function SearchScreen({ navigation }) {
  // const [filters, setFilters] = useState({})
  // const [ showFilter, setShowFilter ] = useState(false);
  const { user } = useContext(UserContext);
  const { activeNetwork } = useContext(NetworkContext);
  const { getItems, itemUuids: postIds, items: posts, scrollToIndex } = useContext(ContentTilePagerContext);
  const [searchValue, setSearchValue] = useState('');
  const [activeMembers, setActiveMembers] = useState([]);
  const [popularPosts, setPopularPosts] = useState([]);
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
  
  useFocusEffect(useCallback(() => {
    getItems();
    getUsers({ requestPolicy: 'network-only' });
  }, []));

  const {
    data: usersData,
    fetching: isFetching,
  } = getUsersResult;

  const mappedPosts = useMemo(() => {
    return postIds.map((uuid) => posts[uuid]);
  }, [postIds]);

  React.useEffect(() => {
    if (!isFetching) {
      let memberData = usersData
        .network_user
        .map(({ user }) => mapUser(user))
      let postData = mappedPosts
      if (searchValue) {
        const testValue = searchValue.toLowerCase()
        memberData = memberData.filter(x => x.name.toLowerCase().indexOf(testValue) >= 0 ||
                (x.profile && x.profile.username && x.profile.username.toLowerCase().indexOf(testValue) >= 0))
        postData = postData.filter(x => (x.heading || '').toLowerCase().indexOf(testValue) >= 0 ||
                  (x.meta && x.meta.description && x.meta.description.toLowerCase().indexOf(testValue) >= 0) ||
                  (x.poll && x.poll.options && x.poll.options.some(y => y.text.toLowerCase().indexOf(testValue) >= 0))
                )
      }
      setActiveMembers(memberData)
      setPopularPosts(postData)
    }
  }, [searchValue, usersData, isFetching, mappedPosts]);
  

  function handleRefresh() {
    setSearchValue('')
    getUsers({ requestPolicy: 'network-only' });
  }

  function onSearch(event) {
    const {text} = event.nativeEvent;
    setSearchValue(text)
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      {/* <SearchFilterModal 
        isVisible={showFilter}
        filters={{}}
        onApply={values => { console.log('VALUES', values); setShowFilter(false)} }
        onClose={() => setShowFilter(false)}
      /> */}
      <View style={styles.searchContainer}>
        <SearchIcon fill={'#000'} width={16} height={16} />
        <TextInput
          style={
            {
              flex: 1, 
              lineHeight: 20,
              fontSize: 16,
              paddingVertical: 20,
              paddingHorizontal: 20,
            }
          }
          placeholder="Search"
          value={searchValue}
          onChange={onSearch}
        />
        {/* <TouchableOpacity onPress={() => setShowFilter(true)}>
          <Image
              source={require('~/assets/images/filter.png')}
              style={{
                width: 16,
                height: 20
              }}
            />
        </TouchableOpacity> */}
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={handleRefresh}
          />
        }
      >
        <View>
          <Text style={styles.heading}>
            Most active members
          </Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.scrollView}
            contentContainerStyle={styles.contentContainer}
          >
            {activeMembers.map((activeMember, index) => (
              <View
                key={index}
                style={[
                  styles.cardWrapper,
                  index === 0 && styles.cardWrapperFirst
                ]}
              >
                <MemberCard
                  {...activeMember}
                  onPress={
                    ({ uuid }) => navigation.navigate('Member', { uuid })
                  }
                />
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={{marginTop: 32}}>
          <Text style={styles.heading}>
            Popular posts
          </Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.scrollView}
            contentContainerStyle={styles.contentContainer}
          >
            {popularPosts.map((post, index) => (
              <View
                key={index}
                style={[
                  styles.cardWrapper,
                  index === 0 && styles.cardWrapperFirst
                ]}
              >
                <ContentCard
                  content={post}
                  onPress={({uuid}) =>  {
                    scrollToIndex({ index: postIds.indexOf(uuid), withAnimation: false })
                    navigation.navigate('Feed')
                  }}
                  // onPress={
                  //   ({ uuid }) => navigation.navigate('Member', { uuid })
                  // }
                />
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginHorizontal: 24,
    marginBottom: 32,
    paddingHorizontal: 16,
    backgroundColor: LIGHT_GRAY
  },
  scrollView: {
    overflow: 'visible'
  },
  contentContainer: {
    flexDirection: 'row',
    overflow: 'visible',
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 20,
  },
  textInput: {
    fontSize: 14,
    lineHeight: 20,
  },
  textInputWrapper: {
    borderRadius: 16,
    padding: 24
  },
  cardWrapper: {
    flex: 1,
    marginLeft: 16,
  },
  cardWrapperFirst: {
    marginLeft: 32,
  },
});

export default SearchScreen;
