import * as React from "react";

function CameraIcon(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <g
        transform="translate(1 3)"
        stroke={props.fill}
        strokeWidth={1.5}
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 16a2 2 0 01-2 2H2a2 2 0 01-2-2V5a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2v11z" />
        <circle cx={11} cy={10} r={4} />
      </g>
    </svg>
  );
}

export default CameraIcon;
