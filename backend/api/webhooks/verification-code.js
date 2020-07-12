import setCORS from '../../utils/setCORS';
import sendEmail from '../../utils/sendEmail';
import {
  SENDGRID_VERIFICATION_TEMPLATE_ID,
} from '../../constants';

const handlers = {
  OPTIONS: (request, response) => {
    return response.status(200).send();
  },
  POST: async (request, response) => {
    const { event } = request.body;

    if (event.op === 'INSERT') {
      const {
        email,
        redirect,
      } = event.data.new;

      await sendEmail({
        to: email,
        templateId: SENDGRID_VERIFICATION_TEMPLATE_ID,
        data: {
          href: redirect,
        },
      });
    }

    return response.status(200).send();
  }
};

const verificationCodeWebhook = (request, response) => {
  setCORS(request, response);

  handlers[request.method] && handlers[request.method](request, response);
}

export default verificationCodeWebhook;
