import setCORS from '../../utils/setCORS';

const handlers = {
  OPTIONS: (request, response) => {
    return response.status(200).send();
  },
  POST: (request, response) => {
    return response.status(200).json({
      hello: 'world',
    });
  }
};

const networkMembershipInvitationWebhook = (request, response) => {
  setCORS(request, response);

  handlers[request.method] && handlers[request.method](request, response);
}

export default networkMembershipInvitationWebhook;
