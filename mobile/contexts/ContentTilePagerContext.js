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

export const FOCUS_ALL = 'FOCUS_ALL';
export const FOCUS_CONTENTS = 'FOCUS_CONTENTS';

export const ContentTilePagerContext = createContext({
  items: [],
  activeIndex: 0,
  focus: FOCUS_ALL,
  shouldReRender: 0,

  getItems: () => {},
  setActiveIndex: () => {},
  setFocus: () => {},
  setShouldRefresh: () => {},
  setFlatListMethods: () => {},
  scrollToIndex: () => {},
  deleteItem: () => {},
});

export const ContentTilePagerContextProvider = ({ children }) => {
  const [shouldReRender, setShouldReRender] = useState(0);
  const [items, setItems] = useState([]);
  // previously lifted the whole flatListRef up, but calling flatListRef
  // methods from here didn't work. So, we're creating a proxy object for
  // flatListRef methods here and actually calling FlatList methods in
  // ContentTilePager
  const flatListMethodsRef = useRef({
    scrollToIndex: () => {},
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const [focus, setFocus] = useState(FOCUS_ALL);
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
    },
    pause: !activeNetwork || !authenticatedUser,
  });
  const [
    deleteContentResult,
    deleteContent,
  ] = useMutation(DeleteContent);

  useEffect(() => {
    if (getContentResult.data && !getContentResult.fetching) {
      const items = getContentResult
        .data
        .content
        .map(mapContent);

      setItems(items);
    }
  }, [getContentResult]);

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
        viewPosition: 0.5,
      });
    }
  }, [flatListMethodsRef.current]);

  function getItems() {
    getContent({
      network_uuid: activeNetwork.uuid,
      viewer_uuid: authenticatedUser.uuid,
    }, {
      requestPolicy: 'cache-and-network',
    });
  }

  function deleteItem({ uuid }) {
    deleteContent({
      uuid,
    });
  }

  return (
    <ContentTilePagerContext.Provider
      value={{
        items,
        activeIndex,
        focus,
        shouldReRender,

        getItems,
        setActiveIndex,
        setFocus,
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
