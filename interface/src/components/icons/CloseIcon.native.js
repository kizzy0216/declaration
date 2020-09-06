import * as React from "react";
import { Animated } from 'react-native';
import Svg, { Path } from 'react-native-svg';

class CloseIcon extends React.Component {
  render() {
    const { props } = this;

    return (
      <Svg viewBox="0 0 24 24" width={16} height={16} {...props}>
        <Path
          d="M20.555 3.4l.044.045c.535.534.535 1.4 0 1.935L13.98 12l6.62 6.62c.535.534.535 1.4 0 1.935l-.044.044c-.534.535-1.4.535-1.935 0L12 13.98 5.38 20.6c-.534.535-1.4.535-1.935 0l-.044-.044a1.369 1.369 0 010-1.935L10.02 12 3.4 5.38a1.369 1.369 0 010-1.935l.044-.044a1.369 1.369 0 011.935 0L12 10.02l6.62-6.62a1.369 1.369 0 011.935 0z"
          fillRule="nonzero"
        />
      </Svg>
    );
  }
}

export default Animated.createAnimatedComponent(CloseIcon);
