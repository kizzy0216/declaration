import * as React from "react";
import { Animated } from 'react-native';
import Svg, { Path } from 'react-native-svg';

class ChevronDownIcon extends React.Component {
  render () {
    const { props } = this;
    return (
      <Svg viewBox="0 0 24 24" width={16} height={16} {...props}>
        <Path
          d="M11.898 17.801a1.568 1.568 0 01-1.266-.742L2.461 8.885A1.574 1.574 0 114.686 6.66L12 13.973l7.314-7.313a1.574 1.574 0 012.113-.102l.112.102c.615.614.615 1.61 0 2.225l-8.171 8.174a1.578 1.578 0 01-1.266.742z"
        />
      </Svg>
    );
  }
}

export default Animated.createAnimatedComponent(ChevronDownIcon);
