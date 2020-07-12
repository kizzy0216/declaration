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
  const [isFetching, setIsFetching] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const [hasHydratedJWT, setHasHydratedJWT] = useState(false);
  const [hasLoadedUser, setHasLoadedUser] = useState(false);
  const [hasSettled, setHasSettled] = useState(false);
  const [getUserResult, getUser] = useQuery({
    query: GetUser,
    variables: {
      uuid: user.uuid,
    },
    pause: !user.uuid,
  });

  // Load persisted JWT and User
  useEffect(() => {
    hydrateJWT().then(() => {
      setHasHydratedJWT(true);
    });

    loadUser().then((user) => {
      setUser(user || {});
      setHasLoadedUser(true);
    });
  }, []);
  useEffect(() => {
    setHasSettled(hasHydratedJWT && hasLoadedUser);
  }, [hasHydratedJWT, hasLoadedUser]);

  // Fetch User record and update local and persisted to latest
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
  useEffect(() => {
    setIsFetching(getUserResult.fetching);
  }, [getUserResult.fetching]);

  function logOut() {
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
    getUser({ requestPolicy: 'network-only' });
  }

  // Proceed with rendering AFTER persisted JWT and User have been loaded
  if (!hasSettled) {
    return null;
  }

  return (
    <UserContext.Provider
      value={{
        user,
        hasSettled,
        isAuthenticated: !!user.uuid,
        logOut,
        logIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
