import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
  createContext,
} from 'react';
import { useQuery, useMutation } from 'urql';

import { NetworkContext } from '~/contexts/NetworkContext';
import { UserContext } from '~/contexts/UserContext';
import GetNetworkContent from '~/queries/GetNetworkContent';
import DeleteContent from '~/mutations/DeleteContent';
import mapContent from '@shared/mappings/mapContent';

export const ContentTilePagerContext = createContext({
  itemUuids: [],
  items: {},
  activeIndex: 0,
  activeItem: {},
  shouldReRender: 0,
  isFetching: false,
  isFetchingOlderItems: false,

  getItems: () => {},
  // getNewerItems: () => {},
  setActiveIndex: () => {},
  setShouldRefresh: () => {},
  setFlatListMethods: () => {},
  scrollToIndex: () => {},
  deleteItem: () => {},
});

const LIMIT = 20;
const FETCH_LIMIT = 15;

export const ContentTilePagerContextProvider = ({ children }) => {
  const [shouldReRender, setShouldReRender] = useState(0);
  const [itemUuids, setItemUuids] = useState([]);
  const [items, setItems] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [activeItem, setActiveItem] = useState({})
  // const [firstItemCreatedAt, setFirstItemCreatedAt] = useState(null);
  // const [lastItemCreatedAt, setLastItemCreatedAt] = useState(null);
  // previously lifted the whole flatListRef up, but calling flatListRef
  // methods from here didn't work. So, we're creating a proxy object for
  // flatListRef methods here and actually calling FlatList methods in
  // ContentTilePager
  const flatListMethodsRef = useRef({
    scrollToIndex: () => {},
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const { user: authenticatedUser } = useContext(UserContext);
  const { activeNetwork } = useContext(NetworkContext);
  const [
    getContentResult,
    getContent,
  ] = useQuery({
    query: GetNetworkContent,
    variables: {
      network_uuid: activeNetwork.uuid,
      viewer_uuid: authenticatedUser.uuid,
      limit: LIMIT,
    },
    pause: !activeNetwork || !authenticatedUser,
  });
  // const [
  //   getContentNewerResult,
  //   getContentNewer,
  // ] = useQuery({
  //   query: GetNetworkContentNewer,
  //   variables: {
  //     network_uuid: activeNetwork.uuid,
  //     viewer_uuid: authenticatedUser.uuid,
  //     limit: LIMIT,
  //   },
  //   pause: !activeNetwork || !authenticatedUser,
  // });
  const [
    deleteContentResult,
    deleteContent,
  ] = useMutation(DeleteContent);

  // const isFetchingNewerItems = false; // getContentNewerResult.fetching;
  const isFetchingOlderItems = getContentResult.fetching;

  useEffect(() => {
    try {
      const contentUuid = itemUuids[activeIndex];
      
      // console.log('INDEX', activeIndex, items)
      if (contentUuid) {
        const i = items[contentUuid]
        if (i) { setActiveItem(i) }
      }
    } catch (e) {
      console.error(e)
    }
  }, [itemUuids, activeIndex])
  useEffect(() => {
    if (getContentResult.data && getContentResult.data.content) {
      const mappedContent = getContentResult
        .data
        .content
        .map(mapContent);

      setItems({
        ...items,
        ...mappedContent.reduce((accumulator, content) => {
          accumulator[content.uuid] = content;
          return accumulator;
        }, {}),
      });

      setItemUuids([
        ...new Set([
          ...itemUuids,
          ...mappedContent.map(({ uuid }) => uuid),
        ]),
      ]);
    }
    setIsFetching(false)
  }, [getContentResult.data]);
  // useEffect(() => {
  //   if (getContentNewerResult.data && getContentNewerResult.data.content) {
  //     const mappedContent = getContentNewerResult
  //       .data
  //       .content
  //       .map(mapContent);

  //     setItems(
  //       mappedContent.reduce((accumulator, content) => {
  //         accumulator[content.uuid] = content;
  //         return accumulator;
  //       }, {}),
  //     );

  //     setItemUuids([
  //       ...new Set(
  //         mappedContent.map(({ uuid }) => uuid),
  //       ),
  //     ]);

  //     setShouldReRender(new Date());
  //   }
  // }, [getContentNewerResult.data]);

  // useEffect(() => {
  //   const lastItemUuid = itemUuids[itemUuids.length - 1];
  //   const lastItem = lastItemUuid && items[lastItemUuid];

  //   if (!lastItem) {
  //     return;
  //   }

  //   if (itemUuids.length - activeIndex <= FETCH_LIMIT) {
  //     if (lastItemCreatedAt !== lastItem.createdAtTimestampTz) {
  //       setLastItemCreatedAt(lastItem.createdAtTimestampTz);
  //     }
  //   }
  // }, [activeIndex]);

  function setFlatListMethods(methods) {
    flatListMethodsRef.current = methods;
  }

  function reRender() {
    setShouldReRender(new Date());
  }

  const scrollToIndex = useCallback(({ index, withAnimation = false }) => {
    if (flatListMethodsRef.current.scrollToIndex) {
      flatListMethodsRef.current.scrollToIndex({
        index,
        animated: withAnimation,
        viewPosition: 0,
      });
    }
  }, [flatListMethodsRef.current]);

  const getItems = () => {
    setIsFetching(true)
    getContent({
      requestPolicy: 'network-only'
    });
  }

  function deleteItem({ uuid }) {
    deleteContent({
      uuid,
    });
  }

  // function getNewerItems() {
  //   const firstItemUuid = itemUuids[0];
  //   const firstItem = firstItemUuid && items[firstItemUuid];

  //   if (!firstItem) {
  //     return;
  //   }

  //   setFirstItemCreatedAt(firstItem.createdAtTimestampTz);
  //   // getContentNewer({
  //   //   requestPolicy: 'cache-and-network',
  //   // });
  // }

  return (
    <ContentTilePagerContext.Provider
      value={{
        itemUuids,
        items,
        activeIndex,
        activeItem,
        shouldReRender,
        isFetching,
        isFetchingOlderItems,
        // isFetchingNewerItems,

        getItems,
        // getNewerItems,
        setActiveIndex,
        reRender,
        setFlatListMethods,
        scrollToIndex,
        deleteItem,
      }}
    >
      {children}
    </ContentTilePagerContext.Provider>
  );
}
