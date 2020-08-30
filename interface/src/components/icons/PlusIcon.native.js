import * as React from "react";
import Svg, { Path } from 'react-native-svg';

function PlusIcon(props) {
  return (
    <Svg viewBox="0 0 24 24" width={16} height={16} {...props}>
      <Path
        d="M12 2c-.818 0-1.481.663-1.481 1.481v7.037H3.48a1.481 1.481 0 100 2.963h7.038v7.038a1.481 1.481 0 102.962 0V13.48h7.038a1.481 1.481 0 100-2.963H13.48V3.481C13.481 2.663 12.818 2 12 2z"
      />
    </Svg>
  );
}

export default PlusIcon;
