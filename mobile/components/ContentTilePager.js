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
  TREE_ROOT_ID,
  WINDOW_HEIGHT,
} from '~/constants';

//   {
//     key: -1,
//     id: -1,
//     heading: "I'm available and looking for a new job as an interior designer",
//     body: "I've created, managed, and implemented every step of client projects including materials.",
//     creator: JOHN,
//     availabilityListing: {
//       callToAction: {
//         href: 'mailto:nickdandakis@gmail.com'
//       },
//       criteria: [
//         {
//           id: 0,
//           text: '3+ years of professional experience',
//         },
//         {
//           id: 1,
//           text: 'Strong knowledge of trade sources',
//         },
//         {
//           id: 2,
//           text: 'Extreme attention to detail',
//         },
//       ],
//     },
//   },

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
  },
  flatList: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0)',
  }
});

export default ContentTilePager;
