import { createClient as createUrqlClient } from 'urql';
import Constants from 'expo-constants';

const { HASURA_BASE_URL } = Constants.manifest.extra;

let inMemoryJWT;

export const setJWT = (jwt) => {
  inMemoryJWT = jwt;
};

export const urqlClient = createUrqlClient({
  url: HASURA_BASE_URL,
  fetchOptions: () => {
    if (inMemoryJWT) {
      return {
        headers: {
          Authorization: `Bearer ${inMemoryJWT}`,
        }
      }
    }

    return {};
  },
});
