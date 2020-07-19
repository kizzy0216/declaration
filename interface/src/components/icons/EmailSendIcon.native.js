import * as React from "react";
import Svg, { Path } from 'react-native-svg';

function EmailSendIcon(props) {
  return (
    <Svg viewBox="0 0 50 50" width="1em" height="1em" {...props}>
      <Path d="M.004 3v32H2V5h43V3zM4 7v32h23v-2H6v-2.02l12.809-10.128c1.035.906 2.949 2.57 3.191 2.78 1.523 1.329 3.14 1.665 4.176 1.665 1.035 0 2.652-.336 4.18-1.664L46 13.996V31l2 2V7zm2 2h40v2.344L29.043 26.125c-1.121.977-2.262 1.172-2.867 1.172-.606 0-1.742-.2-2.863-1.172A95091.737 95091.737 0 016 11.035zm0 4.688c1.695 1.48 6.719 5.859 11.273 9.828L6 32.43zm33.988 16.3a1 1 0 00-.695 1.719L44.586 37H31v2h13.586l-5.293 5.293a.992.992 0 00-.273.973.99.99 0 00.714.714.992.992 0 00.973-.273L48.414 38l-7.707-7.707a1.008 1.008 0 00-.719-.305z" />
    </Svg>
  );
}

export default EmailSendIcon;
