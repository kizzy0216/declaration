import setCORS from '../utils/setCORS';

// Intended mostly to redirect mobile deeplinks (e.g. declaration://log-in),
// some email browsers strip out `href` attributes from `<a />` tags if the
// protocol isn't http(s)

const handlers = {
  GET: (request, response) => {
    const { to } = request.query;

    response.setHeader('Location', to);

    return response.status(308).send();
  },
};

const redirect = (request, response) => {
  setCORS(request, response);

  handlers[request.method] && handlers[request.method](request, response);
};

export default redirect;
