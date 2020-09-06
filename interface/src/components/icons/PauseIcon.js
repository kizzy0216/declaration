import * as React from "react";

function PauseIcon(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <g
        transform="translate(2.024 2)"
        stroke={props.fill}
        strokeWidth={1.5}
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx={10} cy={10} r={10} />
        <path d="M8 13V7M12 13V7" />
      </g>
    </svg>
  );
}

export default PauseIcon;
