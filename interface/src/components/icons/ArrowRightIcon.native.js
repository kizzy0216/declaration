import * as React from "react";
import Svg, { Path } from 'react-native-svg';

function ArrowRightIcon(props) {
  return (
    <Svg viewBox="0 0 50 50" width={16} height={16} {...props}>
      <Path d="M38.035 13.988a1.013 1.013 0 00-.941.606c-.16.375-.078.808.207 1.097L45.277 24H2.023a.995.995 0 00-.875.496.99.99 0 000 1.008c.18.312.516.5.875.496h43.254l-7.976 8.309a1 1 0 101.445 1.382L49.012 25 38.746 14.309a1.005 1.005 0 00-.71-.32z" />
    </Svg>
  );
}

export default ArrowRightIcon;
