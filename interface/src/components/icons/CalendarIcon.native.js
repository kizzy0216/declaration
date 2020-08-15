import * as React from "react";
import { Animated } from 'react-native';
import Svg, { Path } from 'react-native-svg';

class CalendarIcon extends React.Component {
  render () {
    const { props } = this;
    return (
      <Svg viewBox="0 0 50 50" width={16} height={16} {...props}>
        <Path d="M12 0c-1.094 0-2 .906-2 2v2H4c-.523 0-1.055.191-1.43.57C2.191 4.945 2 5.477 2 6v40c0 .523.191 1.055.57 1.434.375.375.907.566 1.43.566h42c.523 0 1.055-.191 1.434-.566.375-.38.566-.91.566-1.434V6c0-.523-.191-1.055-.566-1.43-.38-.379-.91-.57-1.434-.57h-6V2c0-1.094-.906-2-2-2h-2c-1.094 0-2 .906-2 2v2H16V2c0-1.094-.906-2-2-2zm0 2h2v6h-2zm24 0h2v6h-2zM4 6h6v2c0 1.094.906 2 2 2h2c1.094 0 2-.906 2-2V6h18v2c0 1.094.906 2 2 2h2c1.094 0 2-.906 2-2V6h6v7H4zm0 9h42v31H4zm6 4v23h30V19zm2 2h5v5h-5zm7 0h5v5h-5zm7 0h5v5h-5zm7 0h5v5h-5zm-21 7h5v5h-5zm7 0h5v5h-5zm7 0h5v5h-5zm7 0h5v5h-5zm-21 7h5v5h-5zm7 0h5v5h-5zm7 0h5v5h-5zm7 0h5v5h-5z" />
      </Svg>
    );
  }
}

export default Animated.createAnimatedComponent(CalendarIcon);
