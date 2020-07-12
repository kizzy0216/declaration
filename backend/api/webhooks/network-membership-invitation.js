import { URL } from 'url';
import jsonwebtoken from 'jsonwebtoken';

import GetNetworkByUuid from '../../queries/GetNetworkByUuid';
import UpdateNetworkMembershipInvitation from '../../mutations/UpdateNetworkMembershipInvitation';
import setCORS from '../../utils/setCORS';
import sendEmail from '../../utils/sendEmail';
import { fetchHasuraAdmin } from '../../utils/api';
import generatePasscode from '../../utils/generatePasscode';
import {
  SENDGRID_MEMBERSHIP_INVITATION_TEMPLATE_ID,
} from '../../constants';

const handlers = {
  OPTIONS: (request, response) => {
    return response.status(200).send();
  },
  POST: async (request, response) => {
    const { event } = request.body;

    if (event.op === 'INSERT') {
      const {
        uuid,
        network_uuid,
        redirect,
        user_email,
      } = event.data.new;

      const code = generatePasscode(4);
      const redirectUrl = new URL(redirect);
      redirectUrl.searchParams.append('email', user_email);
      redirectUrl.searchParams.append('code', code);

      const { data: networkData } = await fetchHasuraAdmin
        .query(GetNetworkByUuid, { uuid: network_uuid })
        .toPromise();
      const network = networkData.network_by_pk;

      try {
        await sendEmail({
          to: user_email,
          templateId: SENDGRID_MEMBERSHIP_INVITATION_TEMPLATE_ID,
          data: {
            networkName: network.name,
            href: redirectUrl.href,
          },
        });
      } catch (error) {
        console.error(error.response.body.errors);
        return response.status(500).send();
      }

      await fetchHasuraAdmin
        .mutation(UpdateNetworkMembershipInvitation, {
          uuid,
          code,
          redirect: redirectUrl.href,
        })
        .toPromise();
    }

    return response.status(200).send();
  }
};

const networkMembershipInvitationWebhook = (request, response) => {
  setCORS(request, response);

  handlers[request.method] && handlers[request.method](request, response);
}

export default networkMembershipInvitationWebhook;
