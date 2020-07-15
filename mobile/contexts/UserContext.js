import React, {
  useState,
  useEffect,
  createContext,
} from 'react';
import { useQuery } from 'urql';

import GetUser from '~/queries/GetUser';
import mapUser from 'Shared/mappings/mapUser';
import mapNetwork from 'Shared/mappings/mapNetwork';
import {
  saveJWT,
  hydrateJWT,
  saveUser,
  loadUser,
} from '~/utils/api';

export const UserContext = createContext({
  user: {},
  hasSettled: false,
  isAuthenticated: false,
  logOut: () => {},
  logIn: () => {},
});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [hasFetched, setHasFetched] = useState(false);
  const [hasHydratedJWT, setHasHydratedJWT] = useState(false);
  const [hasLoadedUser, setHasLoadedUser] = useState(false);
  const [getUserResult, getUser] = useQuery({
    query: GetUser,
    variables: {
      uuid: user.uuid,
    },
    pause: !user.uuid,
  });
  const {
    fetching: isFetching,
  } = getUserResult;

  // load persisted JWT and User on mount
  useEffect(() => {
    hydrateJWT().then(() => {
      setHasHydratedJWT(true);
    });

    loadUser().then((user) => {
      setUser(user || {});
      setHasLoadedUser(true);
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
      saveUser(mappedUser);
      setHasFetched(true);
    }
  }, [getUserResult.data]);

  // when user.uuid changes, refetch
  useEffect(() => {
    if (user.uuid) {
      getUser({
        requestPolicy: 'network-only',
      });
    }
  }, [user.uuid]);

  function logOut() {
    setHasFetched(false);
    setUser({});
    saveUser(null);
    saveJWT(null);
  }

  function logIn({
    jwt,
    user,
  }) {
    setUser(user);
    saveUser(user);
    saveJWT(jwt);
  }

  const hasSettled = (hasHydratedJWT && hasLoadedUser);

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
        isAuthenticated: !!user.uuid,
        isFetching,
        logOut,
        logIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
