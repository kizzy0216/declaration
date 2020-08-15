import * as React from "react";
import { Animated } from 'react-native';
import Svg, { Path } from 'react-native-svg';

class FullscreenIcon extends React.Component {
  render () {
    const { props } = this;
    return (
      <Svg viewBox="0 0 50 50" width={16} height={16} {...props}>
        <Path d="M6 6v12c-.012.723.367 1.39.992 1.754a1.982 1.982 0 002.016 0A1.988 1.988 0 0010 18v-8h8a1.988 1.988 0 001.754-.992 1.982 1.982 0 000-2.016A1.988 1.988 0 0018 6zm26 0a2 2 0 10-.14 4H40v8a1.995 1.995 0 001.828 2.02c.067.007.133.007.203.007A1.998 1.998 0 0044 18V6zM7.969 30.973A1.998 1.998 0 006 33v12h12c.066 0 .133 0 .2-.008a1.997 1.997 0 001.816-2.09A1.996 1.996 0 0018 41h-8v-8a2 2 0 00-2.031-2.027zm34 0A1.998 1.998 0 0040 33v8h-8a1.988 1.988 0 00-1.754.992 1.982 1.982 0 000 2.016A1.988 1.988 0 0032 45h12V33a2 2 0 00-2.031-2.027z" />
      </Svg>
    );
  }
}

export default Animated.createAnimatedComponent(FullscreenIcon);
