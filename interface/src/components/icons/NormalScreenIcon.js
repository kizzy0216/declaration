import * as React from "react";

function NormalScreenIcon(props) {
  return (
    <svg viewBox="0 0 50 50" width="1em" height="1em" {...props}>
      <path
        d="M8 3v3a2 2 0 01-2 2H3m18 0h-3a2 2 0 01-2-2V3m0 18v-3a2 2 0 012-2h3M3 16h3a2 2 0 012 2v3"
        stroke={props.fill}
        strokeWidth={1.5}
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default NormalScreenIcon;
