import 'isomorphic-unfetch';

const REST_BASE_URL = process.env.REST_BASE_URL;

export const fetchREST = (url, options) => fetch(
  `${REST_BASE_URL}${url}`,
  {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  },
);
