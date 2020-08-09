import * as React from "react";
import Svg, { Path } from 'react-native-svg';

function MenuIcon(props) {
  return (
    <Svg viewBox="0 0 50 50" width={16} height={16} {...props}>
      <Path d="M0 9v2h50V9zm0 15v2h50v-2zm0 15v2h50v-2z" />
    </Svg>
  );
}

export default MenuIcon;
