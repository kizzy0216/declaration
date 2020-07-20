import crypto from 'crypto';

import sharp from 'sharp';
import Color from 'color';

import avatarSvgTemplate from './avatarSvgTemplate';
import hashStringToColor from './hashStringToColor';
import getMatchingColor from './getMatchingColor';

function generateGradient({ identifier, text, width, height }) {
  const hash = crypto.createHash('md5').update(identifier).digest('hex');

  let firstColor = hashStringToColor(hash);
  firstColor = new Color(firstColor).saturate(0.5);

  const lightning = firstColor.hsl().color[2];
  if (lightning < 25) {
    firstColor = firstColor.lighten(3);
  }
  if (lightning > 25 && lightning < 40) {
    firstColor = firstColor.lighten(0.8);
  }
  if (lightning > 75) {
    firstColor = firstColor.darken(0.4);
  }

  let avatar = avatarSvgTemplate.replace('$FIRST', firstColor.hex());
  avatar = avatar.replace('$SECOND', getMatchingColor(firstColor).hex());

  avatar = avatar.replace(/(\$WIDTH)/g, width);
  avatar = avatar.replace(/(\$HEIGHT)/g, height);

  avatar = avatar.replace(/(\$TEXT)/g, text);
  avatar = avatar.replace(/(\$FONTSIZE)/g, (height * 0.9) / text.length);

  return avatar;
}

function parseSize(size) {
  const maxSize = 1000;

  if (size && size.match(/^-?\d+$/) && size <= maxSize) {
    return parseInt(size, 10);
  }

  return 120;
}

export const generateAvatarSvg = ({ identifier, text, width, height }) => {
  width = parseSize(width);
  height = parseSize(height);

  return generateGradient({ identifier, text, width, height })
}

export const generateAvatarPng = ({ identifier, width, height }) => {
  width = parseSize(width);
  height = parseSize(height);

  const svg = generateGradient({ identifier, text: '', width, height });

  return sharp(new Buffer(svg)).png().toBuffer();
}
