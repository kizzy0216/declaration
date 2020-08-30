import * as React from "react";
import { Animated } from 'react-native';
import Svg, { Path } from 'react-native-svg';

class CloseIcon extends React.Component {
  render() {
    const { props } = this;

    return (
      <Svg viewBox="0 0 24 24" width={16} height={16} {...props}>
        <Path
          d="M21.506 2.445l.049.05a1.52 1.52 0 010 2.15L14.199 12l7.356 7.355a1.52 1.52 0 010 2.15l-.05.05a1.52 1.52 0 01-2.15 0L12 14.199l-7.355 7.356a1.52 1.52 0 01-2.15 0l-.05-.05a1.52 1.52 0 010-2.15L9.801 12 2.445 4.645a1.52 1.52 0 010-2.15l.05-.05a1.52 1.52 0 012.15 0L12 9.801l7.355-7.356a1.52 1.52 0 012.15 0z"
        />
      </Svg>
    );
  }
}

export default Animated.createAnimatedComponent(CloseIcon);
