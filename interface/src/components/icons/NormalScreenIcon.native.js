import * as React from "react";
import { Animated } from 'react-native';
import Svg, { Path } from 'react-native-svg';

class NormalScreenIcon extends React.Component {
  render () {
    const { props  } = this;
    return (
      <Svg viewBox="0 0 50 50" width={16} height={16} {...props}>
        <Path d="M16.969 4.973A1.998 1.998 0 0015 7v8H7a1.988 1.988 0 00-1.754.992 1.982 1.982 0 000 2.016A1.988 1.988 0 007 19h12V7a2 2 0 00-2.031-2.027zm16 0a2 2 0 00-1.965 1.886C31 6.906 31 6.953 31 7v12h12c.066 0 .133 0 .2-.008a1.997 1.997 0 001.816-2.09A1.996 1.996 0 0043 15h-8V7a2 2 0 00-2.031-2.027zM7 31a1.988 1.988 0 00-1.754.992 1.982 1.982 0 000 2.016A1.988 1.988 0 007 35h8v8c-.012.723.367 1.39.992 1.754a1.982 1.982 0 002.016 0A1.988 1.988 0 0019 43V31zm24 0v12c-.012.723.367 1.39.992 1.754a1.982 1.982 0 002.016 0A1.988 1.988 0 0035 43v-8h8a1.988 1.988 0 001.754-.992 1.982 1.982 0 000-2.016A1.988 1.988 0 0043 31z" />
      </Svg>
    );
  }
}

export default Animated.createAnimatedComponent(NormalScreenIcon);
