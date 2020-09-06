import * as React from "react";
import Svg, { Path, G } from 'react-native-svg';

function LogOutIcon(props) {
  return (
    <Svg viewBox="0 0 24 24" width={16} height={16} {...props}>
      <G
        stroke={props.fill}
        strokeWidth={1.5}
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M18.31 6.64a9 9 0 11-12.73 0M11.95 2v10" />
      </G>
    </Svg>
  );
}

export default LogOutIcon;
