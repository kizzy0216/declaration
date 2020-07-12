import jsonwebtoken from 'jsonwebtoken';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

import GetUsers from '../queries/GetUsers';
import { fetchHasuraAdmin } from '../utils/api';
import {
  JWT_COOKIE_KEY,
} from '../constants';

const setUser = async (request, response) => {
  const {
    cookies,
    headers,
  } = request;
  request.user = {};

  let jwt;
  if (cookies[JWT_COOKIE_KEY]) {
    jwt = cookies[JWT_COOKIE_KEY];
  }

  // `fetch` transforms Authorization header to lowercase (:
  const authorizationHeader = headers.Authorization || headers.authorization;
  if (authorizationHeader && authorizationHeader.length > 0) {
    jwt = authorizationHeader.split(' ')[1];
  }

  if (jwt) {
    try {
      const { sub: uuid } = jsonwebtoken.verify(jwt, JWT_SECRET_KEY);
      const { data: authenticatedUserData } = await fetchHasuraAdmin
        .query(GetUsers, { uuid })
        .toPromise();
      request.user = authenticatedUserData.user[0];
    } catch {
      return response.status(500).json({ error: 'Unable to verify JWT' });
    }
  }
}

export default setUser;
