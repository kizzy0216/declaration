import SendGrid from '@sendgrid/mail';
SendGrid.setApiKey(process.env.SENDGRID_API_KEY);

import setCORS from '../../utils/setCORS';
import {
  SENDGRID_FROM,
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

      const mail = {
        to: email,
        from: SENDGRID_FROM,
        templateId: SENDGRID_VERIFICATION_TEMPLATE_ID,
        dynamic_template_data: {
          href: redirect,
        },
      };
      await SendGrid.send(mail);
    }

    return response.status(200).send();
  }
};

const verificationCodeWebhook = (request, response) => {
  setCORS(request, response);

  handlers[request.method] && handlers[request.method](request, response);
}

export default verificationCodeWebhook;
