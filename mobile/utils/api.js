import { createClient as createUrqlClient, defaultExchanges, subscriptionExchange } from 'urql';
import { devtoolsExchange } from '@urql/devtools';
import { SubscriptionClient } from 'subscriptions-transport-ws';
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
  resetSubscriptionClient();
  return Promise.resolve();
}

export const saveJWT = (jwt) => {
  inMemoryJWT = jwt;
  resetSubscriptionClient(!Boolean(jwt));
  return SecureStore.setItemAsync('jwt', JSON.stringify(jwt));
};

// TODO explore either string chunking
// (with /interface/src/utils/chunkString)
// or some kind of SecureStore + FileSystem
// (github.com/neverdull-agency/expo-unlimited-secure-store)
// method to securely and reliably store strings larger than 2048.
export const saveUserId = (uuid) => {
  return SecureStore.setItemAsync('user', uuid || '')  // JSON.stringify(user))
};

export const loadUserId = async () => {
  let data;
  try {
    data = await SecureStore.getItemAsync('user');
    if (data && data.length > 100) {
      const userObj = JSON.parse(data)
      if (userObj && userObj.uuid) {
        return Promise.resolve(userObj.uuid)
      }
    }
  } catch {
    console.error('Failed to get user id from local storage');
  }
  return Promise.resolve(data); // JSON.parse(user));
}

const wsClient = new SubscriptionClient(
  HASURA_BASE_URL.replace('https:', 'wss:').replace('http:', 'ws:'), 
  {
    reconnect: true,
    connectionParams: () => ({
      headers: {
        'content-type': 'application/json',
        Authorization: inMemoryJWT ? `Bearer ${inMemoryJWT}` : '',
      }
    })
  }
)

export const resetSubscriptionClient = (isLogout) => {
  // console.log('RESET SUB')
  if (isLogout) {
    // console.log("KILL IT ENTIRELY", inMemoryJWT)
    wsClient.close(true, true);
  } else {
    wsClient.close(true, false)
  }
}
const getExchanges = () => {
  // console.log('Process', process.env.NODE_ENV)
  // if (process.env.NODE_ENV === 'development') {
    return [devtoolsExchange, ...defaultExchanges, subscriptionExchange({
      forwardSubscription: operation => wsClient.request(operation)
    })]
  // } else {
  //   return [...defaultExchanges]
  // }
}
export const urqlClient = createUrqlClient({
  url: HASURA_BASE_URL,
  exchanges: getExchanges(),
  fetchOptions: () => ({
    headers: {
      Authorization: inMemoryJWT ? `Bearer ${inMemoryJWT}` : '',
    }
  }),
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
