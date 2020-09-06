import * as React from "react";

function PlayIcon(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <g
        transform="translate(2 2)"
        stroke={props.fill}
        strokeWidth={1.5}
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx={10} cy={10} r={10} />
        <path d="M8 6l6 4-6 4z" />
      </g>
    </svg>
  );
}

export default PlayIcon;
