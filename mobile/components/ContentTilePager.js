import React, {
  useState,
  useContext,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import { setStatusBarStyle } from 'expo-status-bar';

import { ContentTilePagerContext } from '~/contexts/ContentTilePagerContext';
import { InterfaceContext } from '~/contexts/InterfaceContext';
import ContentCommentModalContainer from '~/containers/ContentCommentModalContainer';
import ContentMenuModalContainer from '~/containers/ContentMenuModalContainer';
import ContentTileContainer from '~/containers/ContentTileContainer';
import {
  WINDOW_HEIGHT,
} from '~/constants';

function ContentTilePager({
  filters,
  hasBlackCommentBox = true
}) {
  const flatListRef = useRef();
  const [isMenuModalActive, setIsMenuModalActive] = useState(false);
  const [isCommentModalActive, setIsCommentModalActive] = useState(false);

  const { setTheme } = useContext(InterfaceContext);
  const {
    itemUuids,
    items,
    shouldReRender,
    setActiveIndex,
    setFlatListMethods,
    isFetching,
    getItems,
  } = useContext(ContentTilePagerContext);

  useEffect(() => {
    if (flatListRef && flatListRef.current) {
      setFlatListMethods({
        scrollToIndex: (params) => {
          flatListRef.current.scrollToIndex(params);
        },
      });
    }
  }, [flatListRef.current]);

  const handleCommentRequest = useCallback(() => setIsCommentModalActive(true), []);
  const handleMenuRequest = useCallback(() => setIsMenuModalActive(true), []);

  const renderItem = useCallback(({ item, index }) => (
    <ContentTileContainer
      hasBlackCommentBox={hasBlackCommentBox}
      {...item}
      key={item.uuid}
      index={index}
      onCommentRequest={handleCommentRequest}
      onMenuRequest={handleMenuRequest}
    />
  ), []);

  const handleViewableItemsChanged = useCallback(({ viewableItems }) => {
    if (!viewableItems || viewableItems.length === 0) {
      return;
    }

    const {
      index: viewableIndex,
      item: viewableItem,
    } = viewableItems[viewableItems.length - 1];

    setTheme((viewableItem.media ? 'light' : 'dark'));
    setActiveIndex(viewableIndex);
    setIsMenuModalActive(false);
    setIsCommentModalActive(false);
  }, []);

  const getItemLayout = useCallback((_, index) => ({
    length: WINDOW_HEIGHT,
    offset: WINDOW_HEIGHT * index,
    index,
  }), [WINDOW_HEIGHT]);

  const keyExtractor = useCallback(({ uuid }) => uuid, []);

  const onRefresh = useCallback(getItems, []);

  const data = useMemo(() => {
    const itemList = itemUuids.map((uuid) => items[uuid]);
    if (filters) {
      if (filters.creator_uuid) {
        return itemList.filter(x => x.creator && x.creator.uuid === filters.creator_uuid)
      }
      if (filters.astronomer_uuid) {
        return itemList.filter(x => x.starsByAstronomerUuid && x.starsByAstronomerUuid[filters.astronomer_uuid])
      }
    }
    return itemList
  }, [itemUuids, filters]);

  if (itemUuids.length === 0) {
    return null;
  }

  return (
    <View style={styles.contentTilePager}>
      <ContentCommentModalContainer
        isVisible={isCommentModalActive}
        onClose={() => setIsCommentModalActive(false)}
      />
      <ContentMenuModalContainer
        isVisible={isMenuModalActive}
        onClose={() => setIsMenuModalActive(false)}
      />

      <FlatList
        ref={flatListRef}
        showPageIndicator={false}
        style={styles.flatList}
        data={data}
        getItemLayout={getItemLayout}
        initialScrollIndex={0}
        renderItem={renderItem}
        extraData={shouldReRender}
        keyExtractor={keyExtractor}
        pagingEnabled={true}
        showsVerticalScrollIndicator={false}
        refreshing={false} // THERE'S A SCROLLING BUG WHEN THE LIST TRIES TO SHOW THE REFRESH ICON.  IF YOU TRY TO CHANGE THIS TO A "FETCHING" VARIABLE, BE SURE TO TEST SCROLLIING, CLICKING BETWEEN TAB SCREENS AND THE FEED SCREEN
        initialNumToRender={5}
        onRefresh={onRefresh}
        onViewableItemsChanged={handleViewableItemsChanged}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contentTilePager: {
    flex: 1,
    backgroundColor: 'white',
  },
  flatList: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0)',
  }
});

export default ContentTilePager;
