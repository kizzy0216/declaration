import { URL } from 'url';

import {
  IS_PRODUCTION
} from '../constants';

const cors = (request, response) => {
  const origin = request.headers.origin;
  if (!origin) {
    return;
  }

  const originURL = new URL(origin);
  const hostParts = originURL.host.split('.');

  if (IS_PRODUCTION) { // only allow declaration.net host
    if (
      hostParts[hostParts.length - 1] === 'net' &&
      hostParts[hostParts.length - 2] === 'declaration'
    ) {
      response.setHeader('Access-Control-Allow-Origin', origin);
    }
  } else { // allow any
    response.setHeader('Access-Control-Allow-Origin', origin);
  }
}

export default cors;
