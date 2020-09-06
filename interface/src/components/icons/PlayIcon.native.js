import * as React from "react";
import Svg, { Path, Circle, G } from 'react-native-svg';

function PlayIcon(props) {
  return (
    <Svg viewBox="0 0 24 24" width={16} height={16} {...props}>
      <G
        transform="translate(2 2)"
        stroke={props.fill}
        strokeWidth={1.5}
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Circle cx={10} cy={10} r={10} />
        <Path d="M8 6l6 4-6 4z" />
      </G>
    </Svg>
  );
}

export default PlayIcon;
