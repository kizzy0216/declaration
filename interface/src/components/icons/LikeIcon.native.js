import * as React from "react";
import Svg, { Path } from 'react-native-svg';

function LikeIcon(props) {
  return (
    <Svg viewBox="0 0 50 50" width={16} height={16} {...props}>
      <Path d="M25 47l-.64-.527c-1.215-1.008-2.86-2.102-4.766-3.368C12.168 38.172 2 31.418 2 19.902 2 12.79 7.832 7 15 7c3.895 0 7.543 1.723 10 4.664A13.012 13.012 0 0135 7c7.168 0 13 5.79 13 12.902 0 11.516-10.168 18.27-17.594 23.203-1.906 1.266-3.55 2.36-4.765 3.368z" />
    </Svg>
  );
}

export default LikeIcon;
