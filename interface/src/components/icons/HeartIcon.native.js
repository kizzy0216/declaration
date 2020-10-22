import * as React from "react";
import { Animated } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';

class HeartIcon extends React.Component {
  render () {
    const { props } = this;
    return (
      <Svg width="40px" height="40px" viewBox="0 0 40 40" {...props}>
        <G
          stroke={props.fill}
          strokeWidth={1.5}
          fill="none"
          fillRule="evenodd"
        >
          <Path d="M20.7698211,29.2762724 C20.5406544,29.4473365 20.2702376,29.5333333 19.9998208,29.5333333 C19.729404,29.5333333 19.4589873,29.4473365 19.2298205,29.2762724 C17.1049863,27.6874223 11.2231923,23.1439988 9.82985836,20.52737 C8.12164934,17.3194546 9.13502475,13.2167069 12.0944843,11.3647528 C13.067068,10.7558021 14.1281101,10.4666667 15.1749439,10.4666667 C17.0110279,10.4666667 18.8035703,11.3559207 19.9998208,12.9694078 C21.196988,11.3554559 22.9890721,10.4666667 24.8246978,10.4666667 C25.8715315,10.4666667 26.9325736,10.7558021 27.9056157,11.3647528 C30.8646169,13.2167069 31.8784506,17.3194546 30.1702416,20.52737 C28.7769077,23.1439988 22.8946553,27.6874223 20.7698211,29.2762724 Z" 
            id="Shape" 
            fill={props.fill} 
            fill-rule="nonzero" 
          />
        </G>
      </Svg>
    );
  }
}

export default Animated.createAnimatedComponent(HeartIcon);
