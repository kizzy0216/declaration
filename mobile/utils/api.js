import { createClient as createUrqlClient } from 'urql';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';

const {
  HASURA_BASE_URL,
  REST_BASE_URL,
} = Constants.manifest.extra;

let inMemoryJWT;

export const hydrateJWT = async () => {
  let jwt;
  try {
    jwt = await SecureStore.getItemAsync('jwt');
  } catch {
    console.error('Failed to get JWT from local storage');
  }
  inMemoryJWT = JSON.parse(jwt);

  return Promise.resolve();
}

export const saveJWT = (jwt) => {
  inMemoryJWT = jwt;
  return SecureStore.setItemAsync('jwt', JSON.stringify(jwt));
};

// TODO explore either string chunking
// (with /interface/src/utils/chunkString)
// or some kind of SecureStore + FileSystem
// (github.com/neverdull-agency/expo-unlimited-secure-store)
// method to securely and reliably store strings larger than 2048.
export const saveUser = (user) => {
  return SecureStore.setItemAsync('user', JSON.stringify(user))
};

export const loadUser = async () => {
  let user;
  try {
    user = await SecureStore.getItemAsync('user');
  } catch {
    console.error('Failed to get user from local storage');
  }
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

export const fetchREST = (url, options) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (inMemoryJWT) {
    headers['Authorization'] = `Bearer ${inMemoryJWT}`;
  }

  return fetch(`${REST_BASE_URL}${url}`, {
    headers,
    ...options,
  });
};
