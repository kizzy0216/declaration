import jsonwebtoken from 'jsonwebtoken';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

import {
  JWT_COOKIE_KEY,
} from '../constants';

const setUser = (request, response) => {
  const { cookies } = request;
  request.user = {};

  if (cookies[JWT_COOKIE_KEY]) {
    try {
      const { sub: uuid } = jsonwebtoken.verify(cookies[JWT_COOKIE_KEY], JWT_SECRET_KEY);
      request.user.uuid = uuid;
    } catch {
      return response.status(500).json({ error: 'Unable to verify JWT' });
    }
  }
}

export default setUser;
