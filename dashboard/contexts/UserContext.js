import React, {
  useState,
  useEffect,
  createContext,
} from 'react';
import { useQuery } from 'urql';

import GetUserAsAdmin from '~/queries/GetUserAsAdmin';
import mapUser from '~/shared/mappings/mapUser';
import mapNetwork from '~/shared/mappings/mapNetwork';

export const UserContext = createContext({
  user: {},
  isFetching: true,
  hasFetched: false,
});

export const UserContextProvider = ({ userUuid, children }) => {
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [hasFetched, setHasFetched] = useState(false);

  const [getUserResult] = useQuery({
    query: GetUserAsAdmin,
    variables: {
      uuid: userUuid,
    },
  });

  useEffect(() => {
    const mappedUser = mapUser(getUserResult.data.user_by_pk);

    // Super Admins have access to all networks,
    // so overwrite the networks the user is a Network Admin of
    if (mappedUser.isSuperAdmin) {
      const allNetworks = getUserResult.data.network;

      mappedUser.networkUuids = allNetworks.map(({ uuid }) => uuid);
      mappedUser.networkIds = allNetworks.map(({ id }) => id);
      mappedUser.networksByUuid = allNetworks.reduce((accumulator, network) => {
        accumulator[network.uuid] = mapNetwork(network);
        return accumulator;
      }, {});
      mappedUser.networksById = allNetworks.reduce((accumulator, network) => {
        accumulator[network.id] = mapNetwork(network);
        return accumulator;
      }, {});
    }

    setUser(mappedUser);
    setHasFetched(true);
  }, [getUserResult.data]);

  useEffect(() => {
    if (getUserResult.fetching) {
      setIsFetching(true);
    } else {
      setIsFetching(false);
    }
  }, [getUserResult.fetching]);

  return (
    <UserContext.Provider
      value={{
        user,
        isFetching,
        hasFetched,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
