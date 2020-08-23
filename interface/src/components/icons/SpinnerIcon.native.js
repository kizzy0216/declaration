import React from "react";
import { Animated } from 'react-native';
import Svg, { Path } from 'react-native-svg';

class SpinnerIcon extends React.Component {
  render () {
    const { props } = this;
    return (
      <Svg
        viewBox="0 0 30 30"
        width={16}
        height={16}
        fill="black"
        {...props}
      >
        <Path d="M15.5 3A3.5 3.5 0 0012 6.5a3.5 3.5 0 003.5 3.5A3.5 3.5 0 0019 6.5 3.5 3.5 0 0015.5 3zM7 7a3 3 0 00-3 3 3 3 0 003 3 3 3 0 003-3 3 3 0 00-3-3zm16 2a1 1 0 00-1 1 1 1 0 001 1 1 1 0 001-1 1 1 0 00-1-1zm2 4.75A1.25 1.25 0 0023.75 15 1.25 1.25 0 0025 16.25 1.25 1.25 0 0026.25 15 1.25 1.25 0 0025 13.75zM5.5 15A2.5 2.5 0 003 17.5 2.5 2.5 0 005.5 20 2.5 2.5 0 008 17.5 2.5 2.5 0 005.5 15zM23 19a2 2 0 00-2 2 2 2 0 002 2 2 2 0 002-2 2 2 0 00-2-2zm-13 3a2 2 0 00-2 2 2 2 0 002 2 2 2 0 002-2 2 2 0 00-2-2zm7 1a2 2 0 00-2 2 2 2 0 002 2 2 2 0 002-2 2 2 0 00-2-2z" />
      </Svg>
    );
  }
}

export default Animated.createAnimatedComponent(SpinnerIcon);
