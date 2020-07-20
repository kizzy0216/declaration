import * as React from "react";
import Svg, { Path } from 'react-native-svg';

function PlusIcon(props) {
  return (
    <Svg viewBox="0 0 50 50" width={16} height={16} {...props}>
      <Path d="M24 9v15H9v2h15v15h2V26h15v-2H26V9z" />
    </Svg>
  );
}

export default PlusIcon;
