import * as React from "react";
import Svg, { Path } from 'react-native-svg';

function PersonIcon(props) {
  return (
    <Svg viewBox="0 0 24 24" width={16} height={16} {...props}>
      <Path d="M11.523 15.642a6.82 6.82 0 100-13.642 6.82 6.82 0 000 13.642zm0-12.226a5.405 5.405 0 110 10.81 5.405 5.405 0 010-10.81zM21.146 20.71a16.392 16.392 0 00-17.91-.197l-.31.202a.69.69 0 00.692 1.195l.083-.054a15.006 15.006 0 0116.67-.006.69.69 0 00.775-1.14z" />
    </Svg>
  );
}

export default PersonIcon;
