import * as React from "react";
import Svg, { Path } from 'react-native-svg';

function ArrowRightIcon(props) {
  return (
    <Svg viewBox="0 0 24 24" width={16} height={16} {...props}>
      <Path
        d="M2.91 11.08h16.006L14.1 6.13a.952.952 0 01-.274-.92.923.923 0 01.661-.682.895.895 0 01.896.278l6.371 6.55a.66.66 0 01.155.216c0 .028.032.056.046.088l.027.094a.524.524 0 010 .08 1.01 1.01 0 010 .37.74.74 0 010 .079l-.027.093c0 .033-.032.061-.046.09a.82.82 0 01-.15.21l-6.371 6.55a.893.893 0 01-1.288 0 .955.955 0 010-1.324l4.815-4.95H2.91a.923.923 0 01-.91-.936c0-.517.408-.936.91-.936z"
      />
    </Svg>
  );
}

export default ArrowRightIcon;
