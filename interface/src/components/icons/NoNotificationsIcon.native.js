import * as React from "react";
import Svg, { Path, G } from 'react-native-svg';

function NoNotificationsIcon(props) {
  return (
    <Svg viewBox="0 0 24 24" width={16} height={16} {...props}>
      <G fill="none" fillRule="evenodd">
        <Path
          stroke={props.fill}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.796 2.796l18.446 18.446"
        />
        <Path
          d="M21.286 15.571a2.146 2.146 0 01-2.147 2.143H4.861a2.144 2.144 0 01-2.147-2.143c0-1.182.96-2.142 2.144-2.142-.002 0 0-4.286 0-4.286A7.142 7.142 0 0112 2a7.142 7.142 0 017.143 7.143v4.285c1.18 0 2.143.96 2.143 2.143zm-2.144-.714c-.79 0-1.428-.638-1.428-1.43V9.144A5.714 5.714 0 0012 3.429a5.713 5.713 0 00-5.714 5.714v4.285c0 .789-.64 1.43-1.428 1.43a.716.716 0 00-.715.713c0 .395.32.715.718.715h14.278a.717.717 0 00.718-.715.717.717 0 00-.715-.714zM8.786 18.786h1.428a1.786 1.786 0 003.572 0h1.428a3.214 3.214 0 01-6.428 0z"
          fill={props.fill}
          fillRule="nonzero"
        />
      </G>
    </Svg>
  );
}

export default NoNotificationsIcon;
