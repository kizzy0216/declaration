import * as React from "react";
import Svg, { Path } from 'react-native-svg';

function ChevronDownIcon(props) {
  return (
    <Svg viewBox="0 0 50 50" width={16} height={16} {...props}>
      <Path d="M4.844 12.906L2.75 15 25 37.25 47.25 15l-2.094-2.094L25 33.063z" />
    </Svg>
  );
}

export default ChevronDownIcon;
