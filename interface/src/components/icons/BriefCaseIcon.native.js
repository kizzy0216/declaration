import * as React from "react";
import Svg, { Path, G, Rect } from 'react-native-svg';

function BriefCaseIcon(props) {
  return (
    <Svg viewBox="0 0 24 24" width={16} height={16} {...props}>
      <G
        transform="translate(2 3)"
        stroke={props.fill}
        strokeWidth={1.5}
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Rect y={4} width={20} height={14} rx={2} />
        <Path d="M14 18V2a2 2 0 00-2-2H8a2 2 0 00-2 2v16" />
      </G>
    </Svg>
  );
}

export default BriefCaseIcon;
