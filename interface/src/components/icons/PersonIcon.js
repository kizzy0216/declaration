import * as React from "react";

function PersonIcon(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <g fill={props.fill} fillRule="nonzero">
        <path d="M12 15.642A6.82 6.82 0 1012 2a6.82 6.82 0 000 13.642zm0-12.226a5.405 5.405 0 110 10.81 5.405 5.405 0 010-10.81zM21.716 20.71c-5.75-3.616-13.214-3.682-19.026-.197l-.33.202a.682.682 0 00-.36.627.691.691 0 00.422.593.775.775 0 00.674-.025l.088-.054c5.362-3.373 12.355-3.373 17.708-.006a.762.762 0 00.984-.21.662.662 0 00-.16-.93z" />
      </g>
    </svg>
  );
}

export default PersonIcon;
