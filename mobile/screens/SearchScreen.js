import React, { useState, useContext } from 'react';
import {
  Image,
  View,
  TextInput,
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
import SearchIcon from '@shared/components/icons/SearchIcon';
// import OtherIcon from '@shared/components/icons/FilterIcon';
import mapUser from '@shared/mappings/mapUser';
import MemberCard from '~/components/MemberCard';
import {
  LIGHT_GRAY,
} from '~/constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SearchFilterModal from '../components/SearchFilterModal';

function SearchScreen({ navigation }) {
  const [searchValue, setSearchValue] = useState('');
  const [filters, setFilters] = useState({})
  const [ showFilter, setShowFilter ] = useState(false);
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
    // console.log('DATA', data)
    items = data
      .network_user
      .map(({ user }) => mapUser(user))
    if (searchValue) {
      items = items.filter(x => x.name.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0 ||
              (x.profile && x.profile.username && x.profile.username.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0))
    }
    if (filters.gender) {
      
    }
    // console.log('ITEMS', items)
  }

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
      <SearchFilterModal 
        isVisible={showFilter}
        filters={{}}
        onApply={values => { console.log('VALUES', values); setShowFilter(false)} }
        onClose={() => setShowFilter(false)}
      />
      <View style={styles.searchContainer}>
        <SearchIcon fill={'#000'} width={16} height={16} />
        <TextInput
          style={
            {
              flex: 1, 
              lineHeight: 18,
              paddingVertical: 12,
              paddingHorizontal: 12,
            }
          }
          placeholder="Search for a user"
          value={searchValue}
          onChange={onSearch}
        />
        <TouchableOpacity onPress={() => setShowFilter(true)}>
          <Image
              source={require('~/assets/images/filter.png')}
              style={{
                width: 16,
                height: 20
              }}
            />
        </TouchableOpacity>
      </View>
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
                ({ uuid }) => navigation.navigate('Member', { uuid })
              }
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 17,
    marginHorizontal: 20,
    paddingHorizontal: 16,
    backgroundColor: LIGHT_GRAY
  },
  container: {
    paddingTop: 20,
    paddingRight: 20,
    paddingLeft: 20,
  },
  textInput: {
    fontSize: 14,
    lineHeight: 20,
  },
  textInputWrapper: {
    borderRadius: 17,
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 23,
    paddingLeft: 20,
  },
  memberCardWrapper: {
    marginBottom: 20,
  },
});

export default SearchScreen;
