import * as React from "react";
import { Animated } from 'react-native';
import Svg, { Path } from 'react-native-svg';

class CommentIcon extends React.Component {
  render () {
    const { props } = this;
    return (
      <Svg width={16} height={16} viewBox="0 0 24 24" {...props}>
        <Path
          d="M19.22 5.082a10 10 0 011.622 11.585 1.333 1.333 0 00-.08 1.08l1.214 3.333a.667.667 0 01-.854.853L17.79 20.72a1.333 1.333 0 00-1.08.08 9.886 9.886 0 01-4.693 1.2A10 10 0 1119.22 5.082zm-4.29 7.896H8.473a.646.646 0 000 1.291h6.457a.646.646 0 000-1.291zm1.291-3.229h-9.04a.646.646 0 100 1.292h9.04a.646.646 0 000-1.292z"
        />
      </Svg>
    );
  }
}

export default Animated.createAnimatedComponent(CommentIcon);
