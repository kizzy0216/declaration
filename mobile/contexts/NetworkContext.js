import React, {
  useState,
  useEffect,
  useContext,
  createContext,
} from 'react';
import { useQuery, useMutation } from 'urql';

import InsertNetworkUserProfile from '~/mutations/InsertNetworkUserProfile';
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
  const { user, isAuthenticated } = useContext(UserContext);
  const [
    insertNetworkProfileResult,
    insertNetworkProfile,
  ] = useMutation(InsertNetworkUserProfile);

  useEffect(() => {
    const {
      networkUuids,
      networksByUuid,
    } = user;

    if (networkUuids && networkUuids.length > 0) {
      const allNetworks = networkUuids.map((networkUuid) => networksByUuid[networkUuid]);
      const firstNetwork = allNetworks[0];

      setActiveNetwork(firstNetwork);
      setNetworks(allNetworks);

      allNetworks.forEach((network) => {
        if (!user.profilesByNetworkUuid[network.uuid]) {
          insertNetworkProfile({
            user_uuid: user.uuid,
            network_uuid: network.uuid,
          });
        }
      });
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
