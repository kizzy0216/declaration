import * as React from "react";
import { Animated } from "react-native";
import Svg, { Path, G } from 'react-native-svg';

class NoAudioIcon extends React.Component {
  render () {
    const { props } = this;
    return (
      <Svg viewBox="0 0 24 24" width={16} height={16} {...props}>
        <G fill="none" fillRule="evenodd">
          <Path
            d="M14.15 2.509a.703.703 0 00-.749.072L7.024 7.243h-4.3A.712.712 0 002 7.968v8.067c0 .411.314.725.725.725h4.3l6.352 4.662c.12.096.266.145.435.145.12 0 .217-.024.338-.073a.706.706 0 00.386-.652V3.161a.733.733 0 00-.386-.652zM6.54 15.31H3.45V8.692h3.092v6.619zm6.546 4.106L7.99 15.673V8.33l5.097-3.744v14.831z"
            fill={props.fill}
            fillRule="nonzero"
          />
          <Path
            stroke={props.fill}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.191 10.167l-3.795 3.796M17.526 10.037l3.795 3.796"
          />
        </G>
      </Svg>
    );
  }
}

export default Animated.createAnimatedComponent(NoAudioIcon);
