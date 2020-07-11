import React, {
  useState,
  useEffect,
  useContext,
  createContext,
} from 'react';
import { useQuery } from 'urql';

import { UserContext } from '~/contexts/UserContext';

export const NetworkContext = createContext({
  activeNetwork: {},
  hasSettled: false,
  setActiveNetwork: () => {},
});

export const NetworkContextProvider = ({ children }) => {
  const [activeNetwork, setActiveNetwork] = useState({});
  const [hasSettled, setHasSettled] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const { networkUuids, networksByUuid } = user;

    if (networkUuids.length > 0) {
      setActiveNetwork(networksByUuid[networkUuids[0]]);
    }
  }, [user]);

  return (
    <NetworkContext.Provider
      value={{
        activeNetwork,
        hasSettled,
        setActiveNetwork: network => setActiveNetwork(network),
      }}
    >
      {children}
    </NetworkContext.Provider>
  );
}
