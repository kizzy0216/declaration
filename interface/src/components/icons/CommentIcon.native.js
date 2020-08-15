import * as React from "react";
import { Animated } from 'react-native';
import Svg, { Path } from 'react-native-svg';

class CommentIcon extends React.Component {
  render () {
    const { props } = this;
    return (
      <Svg width={16} height={16} viewBox="0 0 50 50" {...props}>
        <Path d="M25 4C12.328 4 2 12.879 2 23.992c0 6.453 3.531 12.07 8.96 15.738-.007.215.009.567-.276 1.614-.348 1.3-1.059 3.129-2.496 5.191L7.163 48H8.95c6.192 0 9.774-4.035 10.328-4.684 1.844.434 3.743.672 5.723.672 12.672 0 23-8.879 23-19.996C48 12.88 37.672 4 25 4zm0 0" />
      </Svg>
    );
  }
}

export default Animated.createAnimatedComponent(CommentIcon);
