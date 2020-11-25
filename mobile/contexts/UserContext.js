import React, {
  useState,
  useEffect,
  createContext,
} from 'react';
import { useQuery } from 'urql';

import GetUser from '~/queries/GetUser';
import mapUser from '@shared/mappings/mapUser';
import mapNetwork from '@shared/mappings/mapNetwork';
import {
  saveJWT,
  hydrateJWT,
  saveUserId,
  loadUserId,
} from '~/utils/api';

export const UserContext = createContext({
  user: {},
  hasSettled: false,
  isAuthenticated: false,
  logOut: () => {},
  logIn: () => {},
});

export const UserContextProvider = ({ children }) => {
  const [uuid, setUuid] = useState();
  const [user, setUser] = useState({});
  const [hasFetched, setHasFetched] = useState(false);
  const [hasHydratedJWT, setHasHydratedJWT] = useState(false);
  const [hasLoadedUser, setHasLoadedUser] = useState(false);
  const [getUserResult, getUser] = useQuery({
    query: GetUser,
    variables: {
      uuid: uuid,
    },
    pause: !uuid,
  });
  const {
    fetching: isFetching,
  } = getUserResult;

  // load persisted JWT and User on mount
  useEffect(() => {
    hydrateJWT().then(() => {
      setHasHydratedJWT(true);
    });

    loadUserId().then(uuid => {
      if (uuid) {
        setUuid(uuid);
      } else {
        // ugly way to tell the app that the uuid is not found
        // this will flip hasSettled to true, which is the context gets loaded
        setHasLoadedUser(true); 
      }
    });
  }, []);

  // when a fetched user is returned, save it in local state, and persist it in
  // global state
  useEffect(() => {
    if (getUserResult.data) {
      if (!getUserResult.data.user_by_pk) {
        return logOut();
      }

      const mappedUser = mapUser(getUserResult.data.user_by_pk);

      setUser(mappedUser);
      setHasLoadedUser(true);
      setHasFetched(true);
    }
  }, [getUserResult.data]);

  function logOut() {
    setHasFetched(false);
    setUser({});
    saveUserId();
    setUuid(null);
    saveJWT(null);
  }

  function logIn({
    jwt,
    user,
  }) {
    setUser(user);
    saveUserId(user.uuid);
    setUuid(user.uuid)
    saveJWT(jwt);
  }

  function refresh() {
    getUser({ requestPolicy: 'network-only' });
  }

  const hasSettled = (hasHydratedJWT && hasLoadedUser);

  // mandatory fields of a profile
  const hasProfile = (
    !!user.name &&
    !!user.profile.username &&
    !!user.profile.private.dateOfBirth &&
    !!user.profile.private.gender
  );

  const hasNetworks = (
    user.networkUuids &&
    user.networkUuids.length > 0
  );

  // proceed with rendering AFTER persisted JWT and User have been loaded
  if (!hasSettled) {
    return null;
  }

  return (
    <UserContext.Provider
      value={{
        user,
        hasSettled,
        hasFetched,
        isAuthenticated: uuid,
        isFetching,
        hasProfile,
        hasNetworks,
        logOut,
        logIn,
        refresh,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
