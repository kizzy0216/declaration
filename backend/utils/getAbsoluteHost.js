import tls from 'tls';

const getAbsoluteHost = (request) => {
  const protocol = (
    (
      request.connection.server instanceof tls.Server ||
      request.headers['x-forwarded-proto'] == 'https'
    )
      ? 'https://'
      : 'http://'
  );

  return protocol + request.headers.host;
}

export default getAbsoluteHost;
