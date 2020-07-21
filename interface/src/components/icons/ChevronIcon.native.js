import * as React from "react";
import Svg, { Path } from 'react-native-svg';

function ChevronIcon(props) {
  return (
    <Svg viewBox="0 0 50 50" width={16} height={16} {...props}>
      <Path d="M24.969 13a2 2 0 00-1.383.586l-20 20a1.997 1.997 0 00-.55 1.95c.183.698.73 1.245 1.429 1.429a1.997 1.997 0 001.95-.55L25 17.827l18.586 18.586c.5.523 1.246.734 1.95.55.698-.183 1.245-.73 1.429-1.429a1.997 1.997 0 00-.55-1.95l-20-20A2 2 0 0024.968 13z" />
    </Svg>
  );
}

export default ChevronIcon;
