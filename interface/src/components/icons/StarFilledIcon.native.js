import * as React from "react";
import { Animated } from 'react-native';
import Svg, { Path } from 'react-native-svg';

class StarFilledIcon extends React.Component {
  render () {
    const { props } = this;
    return (
      <Svg viewBox="0 0 50 50" width={16} height={16} {...props}>
        <Path d="M10.2 48.6c-.2 0-.4-.1-.6-.2-.3-.2-.5-.7-.4-1.1l4.4-16.4L.4 20.2c-.4-.2-.5-.7-.4-1.1.1-.4.5-.7.9-.7l17-.9L24 1.6c.2-.3.6-.6 1-.6s.8.3.9.6L32 17.5l17 .9c.4 0 .8.3.9.7.1.4 0 .8-.3 1.1L36.4 30.9l4.4 16.4c.1.4 0 .8-.4 1.1-.3.2-.8.3-1.1 0L25 39.2l-14.3 9.2c-.2.2-.3.2-.5.2z" />
      </Svg>
    );
  }
}

export default Animated.createAnimatedComponent(StarFilledIcon);
