import * as React from "react";
import Svg, { Path, G, Rect } from 'react-native-svg';

function PlusInSquareIcon(props) {
  return (
    <Svg viewBox="0 0 24 24" width={16} height={16} {...props}>
      <G fill="none" fillRule="evenodd">
        <Rect fill={props.fill} width={24} height={24} rx={6} />
        <Path
          d="M12 6.5a.815.815 0 00-.815.815v3.87h-3.87a.815.815 0 100 1.63h3.87v3.87a.815.815 0 101.63 0v-3.87h3.87a.815.815 0 100-1.63h-3.87v-3.87A.815.815 0 0012 6.5z"
          fill="#FFF"
          fillRule="nonzero"
        />
      </G>
    </Svg>
  );
}

export default PlusInSquareIcon;
