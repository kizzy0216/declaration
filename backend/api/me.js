import setCORS from '../utils/setCORS';
import setUser from '../utils/setUser';

const handlers = {
  OPTIONS: (request, response) => {
    return response.status(200).send();
  },
  GET: (request, response) => {
    return response.status(200).json(request.user);
  },
};

const me = (request, response) => {
  setCORS(request, response);
  setUser(request, response);

  handlers[request.method] && handlers[request.method](request, response);
};

export default me;
