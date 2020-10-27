import * as React from "react";
import Svg, { Path, G, Rect } from 'react-native-svg';

function PostsIcon(props) {
  return (
    <Svg viewBox="0 0 24 24" width={24} height={24} {...props}>
      <G
        stroke={props.fill}
        strokeWidth={1.5}
        fill="none"
        fillRule="evenodd"
      >
        <Rect id="Rectangle-Copy-5" stroke="#222222" stroke-width="1.3" x="15.15" y="0.65" width="4.2" height="7.09189189" rx="2"></Rect>
        <Rect id="Rectangle-Copy-7" stroke="#222222" stroke-width="1.3" x="7.9" y="0.65" width="4.2" height="7.09189189" rx="2"></Rect>
        <Rect id="Rectangle-Copy-9" stroke="#222222" stroke-width="1.3" x="0.65" y="0.65" width="4.2" height="7.09189189" rx="2"></Rect>
        <Rect id="Rectangle-Copy-6" stroke="#222222" stroke-width="1.3" x="15.15" y="10.7918919" width="4.2" height="7.55810811" rx="2"></Rect>
        <Rect id="Rectangle-Copy-8" stroke="#222222" stroke-width="1.3" x="7.9" y="10.7918919" width="4.2" height="7.55810811" rx="2"></Rect>
        <Rect id="Rectangle-Copy-10" stroke="#222222" stroke-width="1.3" x="0.65" y="10.7918919" width="4.2" height="7.55810811" rx="2"></Rect>
        {/* <Rect y={4} width={20} height={14} rx={2} /> */}
      </G>
    </Svg>
  );
}

export default PostsIcon;
