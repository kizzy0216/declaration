import * as React from "react";
import { Animated } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

class CalendarIcon extends React.Component {
  render () {
    const { props } = this;
    return (
      <Svg viewBox="0 0 24 24" width={16} height={16} {...props}>
        <Path d="M18.615 2H5.385C3.515 2 2 3.539 2 5.438v13.125C2 20.46 3.515 22 5.385 22h13.23C20.485 22 22 20.461 22 18.562V5.438C22 3.54 20.485 2 18.615 2zM5.135 3.538h13.73c.882 0 1.597.731 1.597 1.632v3.753H3.538V5.17c0-.901.715-1.632 1.597-1.632zm13.73 16.863H5.135c-.882 0-1.597-.766-1.597-1.71v-8.383h16.924v8.382c0 .945-.715 1.71-1.597 1.71z" />
        <Circle cx={8.308} cy={6.308} r={1.538} />
        <Circle cx={15.692} cy={6.308} r={1.538} />
      </Svg>
    );
  }
}

export default Animated.createAnimatedComponent(CalendarIcon);
