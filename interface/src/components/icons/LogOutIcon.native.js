import * as React from "react";
import Svg, { Path } from 'react-native-svg';

function LogOutIcon(props) {
  return (
    <Svg viewBox="0 0 50 50" width={16} height={16} {...props}>
      <Path d="M25 2C12.31 2 2 12.31 2 25s10.31 23 23 23c7.61 0 14.367-3.705 18.55-9.408a1 1 0 10-1.61-1.184C38.117 42.618 31.961 46 25 46 13.39 46 4 36.61 4 25S13.39 4 25 4c6.962 0 13.118 3.383 16.94 8.592a1 1 0 101.61-1.184C39.368 5.705 32.61 2 25 2zm13.99 13.99a1 1 0 00-.697 1.717L44.586 24H23a1 1 0 100 2h21.586l-6.293 6.293a1 1 0 101.414 1.414l7.912-7.912a1 1 0 00-.002-1.592l-7.91-7.91a1 1 0 00-.717-.303z" />
    </Svg>
  );
}

export default LogOutIcon;