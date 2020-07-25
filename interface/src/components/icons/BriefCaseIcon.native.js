import * as React from "react";
import Svg, { Path } from 'react-native-svg';

function BriefCaseIcon(props) {
  return (
    <Svg viewBox="0 0 50 50" width={16} height={16} {...props}>
      <Path d="M20 3c-1.645 0-3 1.355-3 3v3H3c-1.645 0-3 1.355-3 3v14.813A.753.753 0 000 27v17c0 1.645 1.355 3 3 3h44c1.645 0 3-1.355 3-3V12c0-1.645-1.355-3-3-3H33V6c0-1.645-1.355-3-3-3zm0 2h10c.563 0 1 .438 1 1v3H19V6c0-.563.438-1 1-1zM3 11h44c.563 0 1 .438 1 1v15c0 .563-.438 1-1 1H3c-.563 0-1-.438-1-1a.753.753 0 000-.188V12c0-.563.438-1 1-1zm22 11a1.999 1.999 0 100 4 1.999 1.999 0 100-4zM2 29.813A2.95 2.95 0 003 30h44a2.95 2.95 0 001-.188V44c0 .563-.438 1-1 1H3c-.563 0-1-.438-1-1z" />
    </Svg>
  );
}

export default BriefCaseIcon;