import React, {
  useState,
  useEffect,
  createContext,
} from 'react';
import { useQuery } from 'urql';

const MARKETING_BASE_URL = process.env.MARKETING_BASE_URL;

import AuthorizationWall from '~/components/AuthorizationWall';
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
    if (!getUserResult.data.user_by_pk) {
      window.location = `${MARKETING_BASE_URL}/log-out`;
    }

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

  const isAuthorized = (
    !hasFetched || // assume authorized to avoid FOUC
    (
      hasFetched &&
      (
        user.isSuperAdmin ||
        user.networkUuids.length > 0
      )
    )
  );

  return (
    <UserContext.Provider
      value={{
        user,
        isFetching,
        hasFetched,
      }}
    >
      {isAuthorized
        ? (
          children
        ) : (
          <AuthorizationWall />
        )
      }
    </UserContext.Provider>
  );
}
