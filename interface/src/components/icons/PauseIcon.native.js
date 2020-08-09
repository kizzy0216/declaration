import * as React from "react";
import Svg, { Path } from 'react-native-svg';

function PauseIcon(props) {
  return (
    <Svg viewBox="0 0 50 50" width={16} height={16} {...props}>
      <Path d="M12 8v34h10V8zm16 0v34h10V8z" />
    </Svg>
  );
}

export default PauseIcon;
