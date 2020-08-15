import * as React from "react";
import { Animated } from 'react-native';
import Svg, { Path } from 'react-native-svg';

class ShareIcon extends React.Component {
  render () {
    const { props } = this;
    return (
      <Svg viewBox="0 0 50 50" width={16} height={16} {...props}>
        <Path d="M1.996 44.07L0 44.035c-.02-.547-.36-13.422 8.137-22.219 4.824-4.988 11.5-7.613 19.863-7.804V3.594L49.656 20 28 36.41V26.012C3.559 26.472 2.012 43.895 1.996 44.07z" />
      </Svg>
    );
  }
}

export default Animated.createAnimatedComponent(ShareIcon);
