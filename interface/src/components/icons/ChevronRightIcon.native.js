import * as React from "react";
import Svg, { Path } from 'react-native-svg';

function ChevronRightIcon(props) {
  return (
    <Svg viewBox="0 0 24 24" width={16} height={16} {...props}>
      <Path
        d="M17.801 12.102a1.568 1.568 0 01-.742 1.266l-8.174 8.171a1.574 1.574 0 11-2.225-2.225L13.973 12 6.66 4.686a1.574 1.574 0 01-.102-2.113l.102-.112a1.574 1.574 0 012.225 0l8.174 8.171a1.578 1.578 0 01.742 1.266z"
      />
    </Svg>
  );
}

export default ChevronRightIcon;
