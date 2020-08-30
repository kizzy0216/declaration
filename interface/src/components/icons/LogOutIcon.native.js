import * as React from "react";
import Svg, { Path } from 'react-native-svg';

function LogOutIcon(props) {
  return (
    <Svg viewBox="0 0 24 24" width={16} height={16} {...props}>
      <Path d="M22.873 13.027c.017-.032.034-.06.045-.092.015-.042.028-.084.039-.127 0-.03.017-.055.022-.087a1.194 1.194 0 000-.445c0-.029-.017-.055-.022-.084a1.166 1.166 0 00-.04-.127c0-.031-.027-.06-.044-.09a1.141 1.141 0 00-.056-.103c-.02-.032-.045-.06-.067-.09-.022-.029-.033-.049-.053-.072L17.84 6.364a1.091 1.091 0 00-1.58-.05 1.184 1.184 0 00-.048 1.633l3.09 3.4H5.118C4.5 11.346 4 11.862 4 12.5c0 .638.5 1.156 1.117 1.156h14.185l-3.091 3.396c-.274.301-.371.73-.256 1.125.115.395.425.697.814.791.388.095.796-.032 1.07-.333l4.86-5.343c.02-.023.034-.046.054-.07.025-.03.048-.06.07-.092.018-.034.035-.068.05-.104z" />
      <Path d="M5.12 23h4.76c2.275 0 4.12-1.736 4.12-3.877v-1.861c0-.612-.527-1.108-1.177-1.108s-1.178.496-1.178 1.108v1.87c0 .917-.79 1.66-1.765 1.66H5.12c-.975 0-1.765-.743-1.765-1.66V4.876c0-.918.79-1.661 1.765-1.661h4.76c.975 0 1.765.743 1.765 1.661v1.861c0 .612.528 1.108 1.178 1.108.65 0 1.177-.496 1.177-1.108v-1.86C14 2.735 12.155 1 9.88 1H5.12C2.845 1 1 2.736 1 4.877v14.246C1 21.264 2.845 23 5.12 23z" />
    </Svg>
  );
}

export default LogOutIcon;
