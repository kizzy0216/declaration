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

function ContentTilePager() {
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
    isFetchingNewerItems,
    getItems,
  } = useContext(ContentTilePagerContext);

  useEffect(() => {
    if (flatListRef.current) {
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
    return itemUuids.map((uuid) => items[uuid]);
  }, [itemUuids]);

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
        refreshing={isFetchingNewerItems}
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
