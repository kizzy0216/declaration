import * as React from "react";
import { Animated } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';

class NewHeartIcon extends React.Component {
  render () {
    const { props } = this;
    return (
      <Svg width="16px" height="4px" viewbox="0 0 16 4" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg">
        <Path d="M3 1.5C3 2.32843 2.32843 3 1.5 3C0.671573 3 0 2.32843 0 1.5C0 0.671573 0.671573 0 1.5 0C2.32843 0 3 0.671573 3 1.5ZM8.85 1.5C8.85 2.32843 8.17843 3 7.35 3C6.52157 3 5.85 2.32843 5.85 1.5C5.85 0.671573 6.52157 0 7.35 0C8.17843 0 8.85 0.671573 8.85 1.5ZM14.7 1.5C14.7 2.32843 14.0284 3 13.2 3C12.3716 3 11.7 2.32843 11.7 1.5C11.7 0.671573 12.3716 0 13.2 0C14.0284 0 14.7 0.671573 14.7 1.5Z" transform="translate(0.44995117 0.44999695)" id="Combined-Shape" fill={props.fill} fillRule="evenodd" stroke="none" />
      </Svg>
    );
  }
}

export default Animated.createAnimatedComponent(NewHeartIcon);
