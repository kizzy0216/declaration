import { URL } from 'url';

import setCORS from '../../utils/setCORS';
import sendEmail from '../../utils/sendEmail';
import getAbsoluteHost from '../../utils/getAbsoluteHost';
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

      const redirectUrl = new URL(redirect);
      // some email clients strip out `href` attributes from `<a />` tags if
      // they're not http(s), handle that use-case here
      const href = (
        (
          redirectUrl.protocol !== 'https:' ||
          redirectUrl.protocol !== 'http:'
        )
          ? `${getAbsoluteHost(request)}/api/redirect?to=${encodeURIComponent(redirectUrl.href)}`
          : redirectUrl.href
      );

      await sendEmail({
        to: email,
        templateId: SENDGRID_VERIFICATION_TEMPLATE_ID,
        data: {
          href,
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
