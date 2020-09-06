import * as React from "react";
import Svg, { Path, G, Circle } from 'react-native-svg';

function LocationPinIcon(props) {
  return (
    <Svg viewBox="0 0 24 24" width={16} height={16} {...props}>
      <G
        transform="translate(2.802 .838)"
        stroke={props.fill}
        strokeWidth={1.5}
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M18.379 9.19c0 7.147-9.19 13.273-9.19 13.273S0 16.337 0 9.19a9.19 9.19 0 0118.379 0h0z" />
        <Circle cx={9.189} cy={9.189} r={3.063} />
      </G>
    </Svg>
  );
}

export default LocationPinIcon;
