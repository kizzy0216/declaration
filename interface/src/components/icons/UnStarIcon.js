import * as React from "react";

function UnStarIcon(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke={props.fill}
        strokeWidth={1.5}
      >
        <path d="M12 2.49l3.09 6.26L22 9.76l-5 4.87 1.18 6.88L12 18.26l-6.18 3.25L7 14.63 2 9.76l6.91-1.01zM3.191 3.191l17.556 17.556" />
      </g>
    </svg>
  );
}

export default UnStarIcon;
