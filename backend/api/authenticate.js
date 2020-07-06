import jsonwebtoken from 'jsonwebtoken';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

import GetUsers from '../queries/GetUsers';
import GetUsersWithVerificationCode from '../queries/GetUsersWithVerificationCode';
import InsertUserOne from '../mutations/InsertUserOne';
import InsertVerificationCodeOne from '../mutations/InsertVerificationCodeOne';
import DeleteVerificationCode from '../mutations/DeleteVerificationCode';
import UpdateUserEmail from '../mutations/UpdateUserEmail';
import UpdateUserIsVerified from '../mutations/UpdateUserIsVerified';

import { fetchHasuraAdmin } from '../utils/api';
import validateEmail from '../utils/validateEmail';
import generatePasscode from '../utils/generatePasscode';
import setCookie from '../utils/setCookie';
import setCORS from '../utils/setCORS';
import {
  COOKIE_OPTIONS,
  JWT_COOKIE_KEY,
} from '../constants';

const handlers = {
  OPTIONS: (request, response) => {
    return response.status(200).send();
  },
  GET: (request, response) => {
    return response.status(200).send();
  },
  POST: async (request, response) => {
    const {
      email,
      code,
    } = request.body;
    const { cookies } = request;

    // email is required
    if (!email) {
      return response.status(400).json({ error: 'Email required' });
    } else if (!validateEmail(email)) {
      return response.status(400).json({ error: 'Invalid email' });
    }

    // attempt to resolve user from cookies
    let resolvedUser;
    if (cookies[JWT_COOKIE_KEY]) {
      let uuid;
      try {
        const { sub } = jsonwebtoken.verify(cookies[JWT_COOKIE_KEY], JWT_SECRET_KEY);
        uuid = sub;
      } catch {
        return response.status(500).json({ error: 'Unable to verify JWT' });
      }

      if (uuid) {
        const { data: matchedCookieUserData } = await fetchHasuraAdmin
          .query(GetUsersWithVerificationCode, { uuid })
          .toPromise();
        resolvedUser = matchedCookieUserData.user[0];
      }
    }

    // if resolved user from cookies has email and is verified,
    // then they're already authenticated
    if (
      resolvedUser &&
      resolvedUser.email &&
      resolvedUser.email.length > 0 &&
      resolvedUser.is_verified
    ) {
      return response.status(400).json({ error: 'Already authenticated' });
    }

    // fetch user that is associated with this request's email
    const { data: matchedEmailUserData } = await fetchHasuraAdmin
      .query(GetUsers, { email })
      .toPromise();
    resolvedUser = matchedEmailUserData.user[0];

    // insert a new user and associate this request's email
    if (!resolvedUser) {
      const { data: newUserData } = await fetchHasuraAdmin
        .mutation(InsertUserOne, { email })
        .toPromise();

      resolvedUser = newUserData.insert_user_one;

      const { uuid } = resolvedUser;
      const roles = ['temporary'];
      const jwt = jsonwebtoken.sign({
        sub: uuid,
        'https://hasura.io/jwt/claims': {
          'x-hasura-allowed-roles': roles,
          'x-hasura-default-role': roles[0],
          'x-hasura-user-id': uuid,
        },
      }, JWT_SECRET_KEY);
      setCookie({
        response,
        key: JWT_COOKIE_KEY,
        value: jwt,
        options: COOKIE_OPTIONS
      });
    }

    // edge case, but bail if none of the above resolve
    if (!resolvedUser) {
      return response.status(500).json({ error: 'Unable to resolve User' });
    }

    // ensure this email is set to the user
    if (!resolvedUser.email) {
      await fetchHasuraAdmin
        .mutation(UpdateUserEmail, { uuid: resolvedUser.uuid, email })
        .toPromise()
    }

    // request verification email
    if (!code || code.length === 0) {
      if (resolvedUser.verification_code) {
        await fetchHasuraAdmin
          .mutation(DeleteVerificationCode, { email: resolvedUser.email })
          .toPromise();
      }

      const passcode = generatePasscode(4);
      const { data: newVerificationCodeData } = await fetchHasuraAdmin
        .mutation(InsertVerificationCodeOne, { email: resolvedUser.email, code: passcode })
        .toPromise();

      // TODO send verification email
      return response.status(202).json({ message: 'Verification email sent' });
    }

    // match email and code against a user
    const { data: fullyMatchedUserData, ...rest } = await fetchHasuraAdmin
      .query(GetUsersWithVerificationCode, { email, code })
      .toPromise();
    console.log(rest);
    const matchedUser = fullyMatchedUserData.user[0];

    if (!matchedUser) {
      return response.status(403).json({ error: 'Email and code do not match' });
    }

    await fetchHasuraAdmin
      .mutation(DeleteVerificationCode, { email: resolvedUser.email })
      .toPromise();

    // code and email match, so elevate user to verified
    if (!matchedUser.is_verified) {
      await fetchHasuraAdmin
        .mutation(UpdateUserIsVerified, { uuid: matchedUser.uuid, is_verified: true })
        .toPromise();
    }

    const { uuid } = matchedUser;
    const roles = ['user']; // TODO get from user record
    const jwt = jsonwebtoken.sign({
      sub: uuid,
      'https://hasura.io/jwt/claims': {
        'x-hasura-allowed-roles': roles,
        'x-hasura-default-role': roles[0],
        'x-hasura-user-id': uuid,
      },
    }, JWT_SECRET_KEY);
    setCookie({
      response,
      key: JWT_COOKIE_KEY,
      value: jwt,
      options: COOKIE_OPTIONS
    });

    return response.status(200).json({ uuid, roles, jwt });
  },
};

const authenticate = (request, response) => {
  setCORS(request, response);

  handlers[request.method] && handlers[request.method](request, response);
};

export default authenticate;
