import * as React from "react";

function LogOutIcon(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <g
        stroke={props.fill}
        strokeWidth={1.5}
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18.31 6.64a9 9 0 11-12.73 0M11.95 2v10" />
      </g>
    </svg>
  );
}

export default LogOutIcon;
