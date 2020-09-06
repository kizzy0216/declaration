import * as React from "react";
import Svg, { Path, G, Circle } from 'react-native-svg';

function PauseIcon(props) {
  return (
    <Svg viewBox="0 0 24 24" width={16} height={16} {...props}>
      <G
        transform="translate(2.024 2)"
        stroke={props.fill}
        strokeWidth={1.5}
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Circle cx={10} cy={10} r={10} />
        <Path d="M8 13V7M12 13V7" />
      </G>
    </Svg>
  );
}

export default PauseIcon;
