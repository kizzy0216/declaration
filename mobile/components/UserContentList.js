import React, { useMemo, useState, useContext, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { ContentTilePagerContext } from '~/contexts/ContentTilePagerContext';
import ContentCard from '~/components/ContentCard';

import { useNavigation } from '@react-navigation/native';

function UserContentList({user, astronomer}) {
  
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
      if (astronomer && astronomer.uuid) {
        postData = postData.filter(x => x.starsByAstronomerUuid && x.starsByAstronomerUuid[astronomer.uuid])
      }
      setContentList(postData)
  }, [user, mappedPosts]);
  
  return (
      <View style={styles.profileContentContainer}>
        <View style={[styles.container, {
          justifyContent: 'flex-start',
          paddingHorizontal: 2,
        }]}>
          {contentList && contentList.length === 0 ? 
            <View style={{width: '100%', flexDirection: 'row', justifyContent: 'center'}}>
              <Text>No posts added to the network yet</Text>
            </View>
          : <></>}
          {contentList && contentList.map((post, index) => (
            <View key={index} style={{
              minWidth: '28%',
              maxWidth: '30%', 
              flex: 1, 
              marginLeft: index % 3 !== 0 ? 16 : 0, 
              marginBottom: 12
            }}>
              <ContentCard
                cardStyle={{width: '100%'}}
                content={post}
                onPress={({uuid}) =>  navigation.navigate('ContentViewer', {
                  heading: `${user && user.name ? user.name.split(' ')[0] : 'User'}'s Posts`,
                  activeIndex: contentList.map(x => x.uuid).indexOf(uuid),
                  filters: {
                    creator_uuid: user && user.uuid ? user.uuid : '',
                    astronomer_uuid: astronomer && astronomer.uuid ? astronomer.uuid : ''
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
    backgroundColor: 'transparent',
    overflow: 'visible',
  },
  container: {
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
    // paddingRight: 20,
    // paddingLeft: 20,
  },
});

export default UserContentList;
