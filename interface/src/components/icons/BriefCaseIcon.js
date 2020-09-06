import * as React from "react";

function BriefCaseIcon(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <g
        transform="translate(2 3)"
        stroke={props.fill}
        strokeWidth={1.5}
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect y={4} width={20} height={14} rx={2} />
        <path d="M14 18V2a2 2 0 00-2-2H8a2 2 0 00-2 2v16" />
      </g>
    </svg>
  );
}

export default BriefCaseIcon;
