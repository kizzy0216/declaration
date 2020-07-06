import cookie from 'cookie';

const clearCookie = ({
  response,
  key,
  options = {},
}) => {
  const cookieHeader = cookie.serialize(key, '', {
    expires: new Date(1),
    ...options,
  });
  response.setHeader('Set-Cookie', cookieHeader);
};

export default clearCookie;
