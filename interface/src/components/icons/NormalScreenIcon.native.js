import * as React from "react";
import { Animated } from 'react-native';
import Svg, { Path } from 'react-native-svg';

class NormalScreenIcon extends React.Component {
  render () {
    const { props } = this;
    return (
      <Svg viewBox="0 0 24 24" width={16} height={16} {...props}>
        <Path
          d="M8 3v3a2 2 0 01-2 2H3m18 0h-3a2 2 0 01-2-2V3m0 18v-3a2 2 0 012-2h3M3 16h3a2 2 0 012 2v3"
          stroke={props.fill}
          strokeWidth={1.5}
          fill="none"
          fillRule="evenodd"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  }
}

export default Animated.createAnimatedComponent(NormalScreenIcon);
