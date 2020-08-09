import React, {
  useState,
  useEffect,
  useContext,
  createContext,
} from 'react';

import { InterfaceContext } from '~/contexts/InterfaceContext';

export const FOCUS_ALL = 'FOCUS_ALL';
export const FOCUS_CONTENTS = 'FOCUS_CONTENTS';
export const FOCUS_MEDIA = 'FOCUS_MEDIA';

export const ContentTilePagerContext = createContext({
  activeTileIndex: 0,
  focus: FOCUS_ALL,
  setActiveTileIndex: () => {},
  setFocus: () => {},
});

export const ContentTilePagerContextProvider = ({ children }) => {
  const { setIsVisible: setIsInterfaceVisible } = useContext(InterfaceContext);
  const [activeTileIndex, setActiveTileIndex] = useState(0);
  const [focus, setFocus] = useState(FOCUS_ALL);

  useEffect(() => {
    if (focus === FOCUS_MEDIA) {
      setIsInterfaceVisible(false);
    } else {
      setIsInterfaceVisible(true);
    }
  }, [focus]);

  return (
    <ContentTilePagerContext.Provider
      value={{
        activeTileIndex,
        focus,
        setActiveTileIndex,
        setFocus,
      }}
    >
      {children}
    </ContentTilePagerContext.Provider>
  );
}
