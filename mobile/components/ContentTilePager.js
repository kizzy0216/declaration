import React, {
  useState,
  useContext,
  useRef,
  useEffect,
  useCallback,
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
import ContentCommentModal from '~/components/ContentCommentModal';
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
//   {
//     key: 0,
//     id: 0,
//     heading: "Journalists: what is the best reporting advice you've gotten during your career?",
//     creator: SUSAN,
//     meta: {
//       description: '#journo #advice',
//     },
//     commentsById: {
//       [ROOT_COMMENT.id]: ROOT_COMMENT,
//       42: COMMENT_42,
//       6: COMMENT_6,
//       7: COMMENT_7,
//       8: COMMENT_8,
//       88: COMMENT_88,
//       89: COMMENT_89,
//       9: COMMENT_9,
//       99: COMMENT_99,
//       999: COMMENT_999,
//       8888: COMMENT_8888,
//       8889: COMMENT_8889,
//       1: COMMENT_1,
//       2: COMMENT_2,
//       3: COMMENT_LOREM,
//     },
//     commentTree: {
//       parentId: null,
//       id: ROOT_COMMENT.id,
//       children: [
//         {
//           parentId: ROOT_COMMENT.id,
//           id: COMMENT_42.id,
//           children: [
//             {
//               parentId: COMMENT_42.id,
//               id: COMMENT_6.id,
//               children: [],
//             },
//             {
//               parentId: COMMENT_42.id,
//               id: COMMENT_7.id,
//               children: [
//                 {
//                   parentId: COMMENT_7.id,
//                   id: COMMENT_8.id,
//                   children: [
//                     {
//                       parentId: COMMENT_8.id,
//                       id: COMMENT_8889.id,
//                       children: [],
//                     },
//                   ],
//                 },
//               ],
//             },
//             {
//               parentId: COMMENT_42.id,
//               id: COMMENT_89.id,
//               children: [
//                 {
//                   parentId: COMMENT_89.id,
//                   id: COMMENT_9.id,
//                   children: [],
//                 },
//                 {
//                   parentId: COMMENT_89.id,
//                   id: COMMENT_99.id,
//                   children: [],
//                 },
//                 {
//                   parentId: COMMENT_89.id,
//                   id: COMMENT_999.id,
//                   children: [],
//                 },
//               ],
//             },
//             {
//               parentId: COMMENT_42.id,
//               id: COMMENT_8888.id,
//               children: [],
//             },
//             {
//               parentId: COMMENT_42.id,
//               id: COMMENT_88.id,
//               children: [],
//             },
//           ],
//         },
//         {
//           parentId: ROOT_COMMENT.id,
//           id: COMMENT_1.id,
//           children: [],
//         },
//         {
//           parentId: ROOT_COMMENT.id,
//           id: COMMENT_2.id,
//           children: [],
//         },
//         {
//           parentId: ROOT_COMMENT.id,
//           id: COMMENT_LOREM.id,
//           children: [],
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
    items,
    activeIndex,
    shouldReRender,
    setActiveIndex,
    setFlatListMethods,
  } = useContext(ContentTilePagerContext);

  const activeItem = items[activeIndex];

  useEffect(() => {
    if (flatListRef.current) {
      setFlatListMethods({
        scrollToIndex: (params) => {
          flatListRef.current.scrollToIndex(params);
        },
      });
    }
  }, [flatListRef.current]);

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

  if (items.length === 0) {
    return null;
  }

  return (
    <View style={styles.contentTilePager}>
      <ContentCommentModal
        item={activeItem}
        isVisible={isCommentModalActive}
        onClose={() => setIsCommentModalActive(false)}
      />
      <ContentMenuModalContainer
        item={activeItem}
        isVisible={isMenuModalActive}
        onClose={() => setIsMenuModalActive(false)}
      />

      <FlatList
        ref={flatListRef}
        showPageIndicator={false}
        style={styles.flatList}
        data={items}
        getItemLayout={getItemLayout}
        initialScrollIndex={0}
        renderItem={({ item, index }) => (
          <ContentTileContainer
            {...item}
            key={item.uuid}
            index={index}
            onCommentRequest={() => setIsCommentModalActive(true)}
            onMenuRequest={() => setIsMenuModalActive(true)}
          />
        )}
        extraData={shouldReRender}
        keyExtractor={({ uuid }) => uuid}
        pagingEnabled={true}
        showsVerticalScrollIndicator={false}
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
