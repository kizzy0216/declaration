import * as React from "react";
import { Animated } from 'react-native';
import Svg, { Path } from 'react-native-svg';

class ShareIcon extends React.Component {
  render () {
    const { props } = this;
    return (
      <Svg viewBox="0 0 24 24" width={16} height={16} {...props}>
        <Path
          d="M.641 21.702c.098.033.196.065.327.065a.867.867 0 00.751-.457c2.058-3.92 4.378-7.155 11.5-6.926v2.94c0 .425.294.85.686 1.013.36.163.751.065 1.046-.229l8.722-7.35c.229-.164.327-.425.327-.72 0-.293-.13-.522-.36-.718l-8.722-6.893c-.294-.229-.719-.262-1.11-.066-.36.196-.589.523-.589.915V6.25C1.654 7.556.609 15.952.184 19.58c-.066.424-.098.816-.164 1.077-.098.425.164.883.621 1.046z"
        />
      </Svg>
    );
  }
}

export default Animated.createAnimatedComponent(ShareIcon);
