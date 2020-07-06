import 'isomorphic-unfetch';
import { createClient } from '@urql/core';

const isServer = !process.browser;
const HASURA_ADMIN_SECRET_KEY = process.env.HASURA_ADMIN_SECRET_KEY;
const HASURA_BASE_URL = process.env.HASURA_BASE_URL;

export const fetchHasuraAdmin = createClient({
  url: HASURA_BASE_URL,
  fetchOptions: () => {
    const headers = {};

    if (isServer && HASURA_ADMIN_SECRET_KEY) {
      headers['x-hasura-admin-secret'] = HASURA_ADMIN_SECRET_KEY;
    }

    return {
      headers,
    };
  },
});
