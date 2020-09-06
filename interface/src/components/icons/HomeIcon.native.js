import * as React from "react";
import Svg, { G, Path } from 'react-native-svg';

function HomeIcon(props) {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" {...props}>
      <G
        stroke={props.fill}
        strokeWidth={1.5}
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M3.687 9.23L12 2.763l8.313 6.465v10.16c0 1.02-.827 1.847-1.848 1.847H5.535a1.847 1.847 0 01-1.848-1.847V9.23z" />
        <Path d="M9.23 21.236V12h5.54v9.236" />
      </G>
    </Svg>
  );
}

export default HomeIcon;
