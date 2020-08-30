import * as React from "react";
import { Animated } from 'react-native';
import Svg, { Path } from 'react-native-svg';

class StarFilledIcon extends React.Component {
  render () {
    const { props } = this;
    return (
      <Svg viewBox="0 0 24 24" width={16} height={16} {...props}>
        <Path d="M10.153 9.514a.5.5 0 00-.37.724l1.789 3.378-.657 3.763a.5.5 0 00.576.575l3.763-.656 3.389 1.8a.5.5 0 00.723-.37l.54-3.781 2.733-2.67a.5.5 0 00-.124-.807l-3.428-1.684-1.676-3.435a.5.5 0 00-.812-.127l-2.662 2.753-3.784.537zM9.11 17.094a.5.5 0 00-.354-.148H5.427a.501.501 0 000 1.002h3.33a.5.5 0 00.352-.854zM1.709 13.18h6.354a.5.5 0 00.501-.501.5.5 0 00-.5-.502H1.708a.501.501 0 000 1.003zM4.106 7.303h9.178a.5.5 0 00.502-.501.5.5 0 00-.502-.502H4.106a.501.501 0 100 1.003z" />
      </Svg>
    );
  }
}

export default Animated.createAnimatedComponent(StarFilledIcon);
