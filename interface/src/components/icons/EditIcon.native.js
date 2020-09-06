import * as React from "react";
import Svg, { Path, G } from 'react-native-svg';

function EditIcon(props) {
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
        <Path d="M12 20.561h9M16.5 4.06a2.121 2.121 0 013 3L7 19.56l-4 1 1-4 12.5-12.5z" />
      </G>
    </Svg>
  );
}

export default EditIcon;
