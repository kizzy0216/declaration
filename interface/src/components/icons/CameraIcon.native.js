import * as React from "react";
import Svg, { G, Path, Circle } from 'react-native-svg';

function CameraIcon(props) {
  return (
    <Svg viewBox="0 0 24 24" width={16} height={16} {...props}>
      <G
        transform="translate(1 3)"
        stroke={props.fill}
        strokeWidth={1.5}
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M22 16a2 2 0 01-2 2H2a2 2 0 01-2-2V5a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2v11z" />
        <Circle cx={11} cy={10} r={4} />
      </G>
    </Svg>
  );
}

export default CameraIcon;
