import shouldChangeColor from './shouldChangeColor';

function getMatchingColor(firstColor) {
  let color = firstColor;

  if (color.isDark()) {
    color = color.saturate(0.3).rotate(90);
  } else {
    color = color.desaturate(0.3).rotate(90);
  }

  if (shouldChangeColor(color)) {
    color = color.rotate(-200).saturate(0.5);
  }

  return color;
}

export default getMatchingColor;
