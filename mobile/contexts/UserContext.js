import React, {
  useState,
  useEffect,
  createContext,
} from 'react';
import { useQuery } from 'urql';

import GetUser from '~/queries/GetUser';
import mapUser from '~/mappings/mapUser';
import mapNetwork from '~/mappings/mapNetwork';

export const UserContext = createContext({
  user: {},
  isFetching: true,
  hasFetched: false,
  clear: () => {},
});

export const UserContextProvider = ({ userUuid, children }) => {
  const [user, setUser] = useState({});
  const [isFetching, setIsFetching] = useState(true);
  const [hasFetched, setHasFetched] = useState(false);
  const [getUserResult] = useQuery({
    query: GetUser,
    variables: {
      uuid: userUuid,
    },
    pause: !userUuid,
  });

  useEffect(() => {
    if (!userUuid) {
      setHasFetched(true);
      setIsFetching(false);
    }
  }, []);

  useEffect(() => {
    if (getUserResult.data) {
      const mappedUser = mapUser(getUserResult.data.user_by_pk);

      setUser(mappedUser);
      setHasFetched(true);
    }
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
        clear: () => {
          setUser({});
        },
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
