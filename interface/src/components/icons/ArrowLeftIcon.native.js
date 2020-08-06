import * as React from "react";
import Svg, { Path } from 'react-native-svg';

function ArrowLeftIcon(props) {
  return (
    <Svg viewBox="0 0 50 50" width={16} height={16} {...props}>
      <Path d="M19.813 13.094a.99.99 0 00-.563.312L8.344 24.281 7.656 25l.688.719L19.25 36.594c.242.297.629.433 1.004.347.371-.086.664-.379.75-.75a1.004 1.004 0 00-.348-1.004L11.47 26H41c.36.004.695-.184.879-.496a1.01 1.01 0 000-1.008c-.184-.312-.52-.5-.879-.496H11.469l9.187-9.188c.324-.3.41-.777.215-1.171a.996.996 0 00-1.058-.547z" />
    </Svg>
  );
}

export default ArrowLeftIcon;