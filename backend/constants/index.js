const NODE_ENV = process.env.NODE_ENV;

export const IS_PRODUCTION = (NODE_ENV === 'production');

export const JWT_COOKIE_KEY = 'declarationJWT';

export const COOKIE_OPTIONS = (
  IS_PRODUCTION
    ? {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      domain: 'declaration.net',
    }
    : {
      path: '/',
    }
);

export const SENDGRID_FROM = 'help@declaration.net';
export const SENDGRID_VERIFICATION_TEMPLATE_ID = 'd-bcbf2ca538ec459fbc41d41a6d4e09b4';
export const SENDGRID_MEMBERSHIP_INVITATION_TEMPLATE_ID = 'd-402a7e5579b64e01ae6538c141e259c5';
