import { URL } from 'url';
import jsonwebtoken from 'jsonwebtoken';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

import GetVerificationCodes from '../queries/GetVerificationCodes';
import GetUsers from '../queries/GetUsers';
import InsertUserOne from '../mutations/InsertUserOne';
import InsertVerificationCodeOne from '../mutations/InsertVerificationCodeOne';
import DeleteVerificationCode from '../mutations/DeleteVerificationCode';
import UpdateUserEmail from '../mutations/UpdateUserEmail';
import UpdateUserIsVerified from '../mutations/UpdateUserIsVerified';

import { fetchHasuraAdmin } from '../utils/api';
import validateEmail from '../utils/validateEmail';
import generatePasscode from '../utils/generatePasscode';
import setUser from '../utils/setUser';
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
      redirect,
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

    if ((!code || code.length === 0) && (!redirect || redirect.length === 0)) {
      return response.status(400).json({ error: 'Redirect required, when supplying just email' });
    }

    // attempt to resolve authenticated user
    let resolvedUser;
    if (request.user.uuid) {
      resolvedUser = request.user;
    }

    // if resolved user from authentication has email and is verified,
    // then there's nothing to do
    if (
      resolvedUser &&
      resolvedUser.email &&
      resolvedUser.email.length > 0 &&
      resolvedUser.is_verified
    ) {
      return response.status(400).json({ error: 'Already authenticated' });
    }

    // request verification email
    if (!code || code.length === 0) {
      await fetchHasuraAdmin
        .mutation(DeleteVerificationCode, { email })
        .toPromise();

      const passcode = generatePasscode(4);
      const redirectUrl = new URL(redirect);
      redirectUrl.searchParams.append('email', email);
      redirectUrl.searchParams.append('code', passcode);

      const { data: newVerificationCodeData } = await fetchHasuraAdmin
        .mutation(InsertVerificationCodeOne, {
          email, 
          code: passcode,
          redirect: redirectUrl.href,
        })
        .toPromise();

      return response.status(202).json({ message: 'Verification email sent' });
    }

    // match email and code
    const { data: matchedVerificationData, ...rest } = await fetchHasuraAdmin
      .query(GetVerificationCodes, { email, code })
      .toPromise();
    const matchedVerification = matchedVerificationData.verification_code[0];

    if (!matchedVerification) {
      return response.status(403).json({ error: 'Email and code do not match' });
    }

    // fetch User with matching email
    const { data: matchedUserData } = await fetchHasuraAdmin
      .query(GetUsers, { email })
      .toPromise();
    resolvedUser = matchedUserData.user[0]

    // if User doesn't exist, create new one
    if (!resolvedUser) {
      const { data: newUserData } = await fetchHasuraAdmin
        .mutation(InsertUserOne, { email })
        .toPromise();

      resolvedUser = newUserData.insert_user_one;
    }

    await fetchHasuraAdmin
      .mutation(DeleteVerificationCode, { email })
      .toPromise();

    // code and email match, so elevate user to verified
    if (!resolvedUser.is_verified) {
      await fetchHasuraAdmin
        .mutation(UpdateUserIsVerified, { uuid: resolvedUser.uuid, is_verified: true })
        .toPromise();
    }

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

    return response.status(200).json({ uuid, roles, jwt });
  },
};

const authenticate = async (request, response) => {
  setCORS(request, response);
  await setUser(request, response);

  handlers[request.method] && handlers[request.method](request, response);
};

export default authenticate;
