import tls from 'tls';

const getAbsoluteUrl = (request) => {
  const protocol = (
    (
      request.connection.server instanceof tls.Server ||
      request.headers['x-forwarded-proto'] == 'https'
    )
      ? 'https://'
      : 'http://'
  );

  return protocol + request.headers.host + request.url;
}

export default getAbsoluteUrl;
