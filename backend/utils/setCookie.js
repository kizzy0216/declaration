import cookie from 'cookie';

const setCookie = ({
  response,
  key,
  value,
  options = {}
}) => {
  const cookieHeader = cookie.serialize(key, value, options);
  response.setHeader('Set-Cookie', cookieHeader);
};

export default setCookie;
