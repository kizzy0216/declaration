import * as React from "react";

function EditIcon(props) {
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
        <path d="M12 20.561h9M16.5 4.06a2.121 2.121 0 013 3L7 19.56l-4 1 1-4 12.5-12.5z" />
      </g>
    </svg>
  );
}

export default EditIcon;
