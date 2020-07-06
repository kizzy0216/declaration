import {
  COOKIE_OPTIONS,
  JWT_COOKIE_KEY,
} from '../constants';
import clearCookie from '../utils/clearCookie';
import setCORS from '../utils/setCORS';

const handlers = {
  OPTIONS: (request, response) => {
    return response.status(200).send();
  },
  POST: (request, response) => {
    clearCookie({
      response,
      key: JWT_COOKIE_KEY,
      options: COOKIE_OPTIONS
    });

    return response.status(200).json({});
  }
};

const logOut = (request, response) => {
  setCORS(request, response);

  handlers[request.method] && handlers[request.method](request, response);
}

export default logOut;
