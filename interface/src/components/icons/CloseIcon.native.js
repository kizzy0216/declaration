import * as React from "react";
import { Animated } from 'react-native';
import Svg, { Path } from 'react-native-svg';

class CloseIcon extends React.Component {
  render() {
    const { props } = this;

    return (
      <Svg viewBox="0 0 50 50" width={16} height={16} {...props}>
        <Path
          d="M7.719 6.281L6.28 7.72 23.563 25 6.28 42.281 7.72 43.72 25 26.437
          42.281 43.72l1.438-1.438L26.437 25 43.72 7.719 42.28 6.28 25 23.563z"
        />
      </Svg>
    );
  }
}

export default Animated.createAnimatedComponent(CloseIcon);
