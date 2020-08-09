import * as React from "react";
import Svg, { Path } from 'react-native-svg';

function PlayIcon(props) {
  return (
    <Svg viewBox="0 0 50 50" width={16} height={16} {...props}>
      <Path d="M10 5.25v39.496L43.57 25z" />
    </Svg>
  );
}

export default PlayIcon;
