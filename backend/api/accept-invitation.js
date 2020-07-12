import jsonwebtoken from 'jsonwebtoken';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

import InsertNetworkUserOne from '../mutations/InsertNetworkUserOne';
import UpdateUserIsVerified from '../mutations/UpdateUserIsVerified';
import DeleteNetworkMembershipInvitation from '../mutations/DeleteNetworkMembershipInvitation';
import InsertUserOne from '../mutations/InsertUserOne';
import GetUsers from '../queries/GetUsers';
import GetNetworkUsersByEmail from '../queries/GetNetworkUsersByEmail';
import GetNetworkMembershipInvitations from '../queries/GetNetworkMembershipInvitations';
import validateEmail from '../utils/validateEmail';
import { fetchHasuraAdmin } from '../utils/api';
import {
  COOKIE_OPTIONS,
  JWT_COOKIE_KEY,
} from '../constants';
import setCORS from '../utils/setCORS';
import setUser from '../utils/setUser';

// If User doesn't exist with email, create new User with email and name
// Create Network User
// Delete Membership Invitation

const handlers = {
  OPTIONS: (request, response) => {
    return response.status(200).send();
  },
  POST: async (request, response) => {
    const {
      email,
      code,
      withCookies = true,
    } = request.body;
    const { cookies } = request;

    // email is required
    if (!email || email.length === 0) {
      return response.status(400).json({ error: 'Email required' });
    } else if (!validateEmail(email)) {
      return response.status(400).json({ error: 'Invalid email' });
    }

    // code is required
    if (!code || code.length === 0) {
      return response.status(400).json({ error: 'Code required' });
    }

    // attempt to resolve authenticated user
    let resolvedUser;
    if (request.user.uuid) {
      resolvedUser = request.user;
    }

    // ensure Membership Invitation is found
    const { data: matchedInvitationData } = await fetchHasuraAdmin
      .query(GetNetworkMembershipInvitations, { email, code })
      .toPromise();
    const matchedInvitation = matchedInvitationData.network_membership_invitation[0];

    if (!matchedInvitation) {
      return response.status(404).json({ error: 'Invitation not found' });
    }

    // if authenticated, ensure invitation email matches authenticated email
    if (resolvedUser && resolvedUser.email !== matchedInvitation.email) {
      return response.status(401).json({ error: 'Authenticated User email does not match Invitation email' });
    }

    // resolve User from email, if unauthenticated
    if (!resolvedUser) {
      const { data: foundUserData } = await fetchHasuraAdmin
        .query(GetUsers, { email })
        .toPromise();
      resolvedUser = foundUserData.user[0];
    }

    // ensure email does not exist in Network Users
    const { data: matchedNetworkUserData } = await fetchHasuraAdmin
      .query(GetNetworkUsersByEmail, { email })
      .toPromise();
    const matchedNetworkUser = matchedNetworkUserData.network_user[0];

    if (matchedNetworkUser && matchedNetworkUser.email === email) {
      return response.status(400).json({ error: 'User already part of the Network' });
    }

    // if User doesn't exist, create new one
    if (!resolvedUser) {
      const { data: newUserData } = await fetchHasuraAdmin
        .mutation(InsertUserOne, { email, name: matchedInvitation.user_name })
        .toPromise();

      resolvedUser = newUserData.insert_user_one;
    }

    // finally, set give the resolved user access to the network
    await fetchHasuraAdmin
      .mutation(InsertNetworkUserOne, {
        user_uuid: resolvedUser.uuid,
        network_uuid: matchedInvitation.network_uuid,
      })
      .toPromise();

    // clean up
    await fetchHasuraAdmin
      .mutation(DeleteNetworkMembershipInvitation, { uuid: matchedInvitation.uuid })
      .toPromise();

    // code and email match, so elevate user to verified
    if (!resolvedUser.is_verified) {
      await fetchHasuraAdmin
        .mutation(UpdateUserIsVerified, { uuid: resolvedUser.uuid, is_verified: true })
        .toPromise();
    }

    // if unauthenticated request, treat it as a request to authenticate,
    // such that an invitation leads them straight into the system
    if (!request.user.uuid) {
      const {
        uuid,
        super_admin,
      } = resolvedUser;
      const roles = [];
      if (super_admin) {
        roles.push('super_admin');
      }
      roles.push('user');
      const jwt = jsonwebtoken.sign({
        sub: uuid,
        'https://hasura.io/jwt/claims': {
          'x-hasura-allowed-roles': roles,
          'x-hasura-default-role': roles[0],
          'x-hasura-user-id': uuid,
        },
      }, JWT_SECRET_KEY);
      if (withCookies) {
        setCookie({
          response,
          key: JWT_COOKIE_KEY,
          value: jwt,
          options: COOKIE_OPTIONS
        });
      }

      return response.status(201).json({ uuid, roles, jwt });
    }

    return response.status(200).json({});
  },
};

const acceptInvitation = async (request, response) => {
  setCORS(request, response);
  await setUser(request, response);

  handlers[request.method] && handlers[request.method](request, response);
};

export default acceptInvitation;
