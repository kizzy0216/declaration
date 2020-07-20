function shouldChangeColor(color) {
  const rgb = color.rgb().array();
  const val = 765 - (rgb[0] + rgb[1] + rgb[2]);

  if (val < 250 || val > 700) {
    return true;
  }

  return false;
}

export default shouldChangeColor;
