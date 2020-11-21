import * as React from "react";
import { Animated } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';

class NewHeartIcon extends React.Component {
  render () {
    const { props } = this;
    return (
      <Svg width="27px" height="24px" viewbox="0 0 27 24" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg">
        <G id="Icon-Like-OFF">
          <Path d="M14.4448 23.4397C14.1635 23.6528 13.8317 23.76 13.4998 23.76C13.1679 23.76 12.836 23.6528 12.5548 23.4397C9.94703 21.4597 2.72846 15.7979 1.01846 12.5372C-1.07798 8.53963 0.165712 3.42697 3.79778 1.11915C4.9914 0.360307 6.29359 0 7.57834 0C9.83172 0 12.0317 1.10815 13.4998 3.1188C14.969 1.10757 17.1684 0 19.4212 0C20.706 0 22.0082 0.360307 23.2023 1.11915C26.8338 3.42697 28.0781 8.53963 25.9817 12.5372C24.2717 15.7979 17.0525 21.4597 14.4448 23.4397Z" transform="matrix(1 0 0 1 -1.5010215E-13 0)" id="Shape" fill="#49D6CF" fill-rule="evenodd" stroke="none" />
        </G>
      </Svg>
    );
  }
}

export default Animated.createAnimatedComponent(NewHeartIcon);
