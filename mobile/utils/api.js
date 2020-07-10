import { createClient as createUrqlClient } from 'urql';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';

const {
  HASURA_BASE_URL,
  REST_BASE_URL,
} = Constants.manifest.extra;

let inMemoryJWT;

export const hydrateJWT = async () => {
  const jwt = await SecureStore.getItemAsync('jwt');
  inMemoryJWT = JSON.parse(jwt);

  return Promise.resolve();
}

export const saveJWT = (jwt) => {
  inMemoryJWT = jwt;
  return SecureStore.setItemAsync('jwt', JSON.stringify(jwt));
};

export const saveUser = (user) => {
  return SecureStore.setItemAsync('user', JSON.stringify(user))
};

export const loadUser = async () => {
  const user = await SecureStore.getItemAsync('user');
  return Promise.resolve(JSON.parse(user));
}

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

export const fetchREST = (url, options) => fetch(
  `${REST_BASE_URL}${url}`,
  {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  },
);
