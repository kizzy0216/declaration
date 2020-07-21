import * as React from "react";
import Svg, { Path } from 'react-native-svg';

function PlusInSquareIcon(props) {
  return (
    <Svg viewBox="0 0 50 50" width={16} height={16} {...props}>
      <Path d="M9 4C6.255 4 4 6.255 4 9v32c0 2.745 2.255 5 5 5h32c2.745 0 5-2.255 5-5V9c0-2.745-2.255-5-5-5H9zm0 2h32c1.655 0 3 1.345 3 3v32c0 1.655-1.345 3-3 3H9c-1.655 0-3-1.345-3-3V9c0-1.655 1.345-3 3-3zm15 7v11H13v2h11v11h2V26h11v-2H26V13h-2z" />
    </Svg>
  );
}

export default PlusInSquareIcon;
