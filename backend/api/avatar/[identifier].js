// ripped from
// https://github.com/tobiaslins/avatar
import setCORS from '../../utils/setCORS';
import {
  generateAvatarSvg,
  generateAvatarPng,
} from '../../utils/generateAvatar';

const svgExt = /\.svg$/;
const pngExt = /\.png$/;
const sizePat = /^\d+x\d+$/;

const handlers = {
  GET: async (request, response) => {
    const { query } = request;
    const { identifier } = query;

    response.setHeader('Cache-Control', 'max-age=2592000, public')
    response.setHeader('Last-Modified', 'Mon, 03 Jan 2011 17:45:57 GMT')

    let height;
    if (sizePat.test(query.size)) {
      height = query.size.slice(query.size.indexOf('x') + 1);
      query.size = query.size.slice(0, query.size.indexOf('x'));
    } else {
      height = query.size;
    }

    if (query.type === 'svg' || svgExt.test(identifier)) {
      response.setHeader('Content-Type', 'image/svg+xml');

      const svg = generateAvatarSvg({
        identifier: identifier.replace(svgExt, ''),
        text: query.text || '',
        width: query.size,
        height: height || '',
      });

      return response.status(200).send(svg);
    }

    response.setHeader('Content-Type', 'image/png');

    const buffer = await generateAvatarPng({
      identifier: identifier.replace(pngExt, ''),
      width: query.size,
      height: height || '',
      height: height || '',
    });

    return response.status(200).send(buffer);
  },
};

const me = async (request, response) => {
  setCORS(request, response);

  handlers[request.method] && handlers[request.method](request, response);
};

export default me;
