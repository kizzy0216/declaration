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
  networks: [],
  hasSettled: false,
  setActiveNetwork: () => {},
});

export const NetworkContextProvider = ({ children }) => {
  const [activeNetwork, setActiveNetwork] = useState({});
  const [networks, setNetworks] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const { networkUuids, networksByUuid } = user;

    if (networkUuids.length > 0) {
      const allNetworks = networkUuids.map((networkUuid) => networksByUuid[networkUuid]);
      const firstNetwork = allNetworks[0];
      setActiveNetwork(firstNetwork);
      setNetworks(allNetworks);
    }
  }, [user]);

  return (
    <NetworkContext.Provider
      value={{
        activeNetwork,
        networks,
        hasSettled: user.hasSettled,
        setActiveNetwork: network => setActiveNetwork(network),
      }}
    >
      {children}
    </NetworkContext.Provider>
  );
}
