import * as React from "react";
import Svg, { Path } from 'react-native-svg';

function CheckmarkIcon(props) {
  return (
    <Svg viewBox="0 0 24 24" width={16} height={16} {...props}>
      <Path
        d="M21.66 6.606L8.88 19.002a1.122 1.122 0 01-1.572-.015l-4.98-4.973a1.128 1.128 0 010-1.59 1.128 1.128 0 011.584 0l4.2 4.204L20.1 5a1.12 1.12 0 111.56 1.606z"
      />
    </Svg>
  );
}

export default CheckmarkIcon;
