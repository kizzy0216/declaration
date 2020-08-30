import * as React from "react";
import Svg, { Path } from 'react-native-svg';

function MenuIcon(props) {
  return (
    <Svg viewBox="0 0 24 24" width={16} height={16} {...props}>
      <Path
        d="M1.463 2.106a1.462 1.462 0 100 2.923h21.074a1.462 1.462 0 100-2.923H1.463zm0 7.892a1.462 1.462 0 100 2.923h21.074a1.462 1.462 0 100-2.923H1.463zm0 7.892a1.462 1.462 0 100 2.924h21.074a1.462 1.462 0 100-2.924H1.463z"
      />
    </Svg>
  );
}

export default MenuIcon;
