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
