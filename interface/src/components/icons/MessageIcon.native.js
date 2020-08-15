import * as React from "react";
import { Animated } from 'react-native';
import Svg, { Path } from 'react-native-svg';

class MessageIcon extends React.Component {
  render () {
    const { props } = this;
    return (
      <Svg viewBox="0 0 50 50" width={16} height={16} {...props}>
        <Path d="M48.906 0a.99.99 0 00-.375.125l-48 26a.996.996 0 00-.52.957c.036.395.301.73.676.855l13.626 4.47L13 45.906a.995.995 0 00.594 1.034.984.984 0 001.156-.285l8.594-9.718 12.968 12.78c.254.25.622.344.965.247a.985.985 0 00.692-.715l12-48A.99.99 0 0048.906 0zM47.47 2.938L36.437 47.062 24.595 35.376l17.218-23.781a.994.994 0 10-1.437-1.375L15.219 30.594 3.5 26.78zM35.78 16.5L22.656 34.719a.949.949 0 00-.093.125l-.063.062a1.302 1.302 0 00-.063.094l-7.156 8.031 1.063-10.812z" />
      </Svg>
    );
  }
}

export default Animated.createAnimatedComponent(MessageIcon);
