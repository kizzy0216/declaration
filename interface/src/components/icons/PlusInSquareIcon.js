import * as React from "react";

function PlusInSquareIcon(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <g fill="none" fillRule="evenodd">
        <rect fill={props.fill} width={24} height={24} rx={6} />
        <path
          d="M12 6.5a.815.815 0 00-.815.815v3.87h-3.87a.815.815 0 100 1.63h3.87v3.87a.815.815 0 101.63 0v-3.87h3.87a.815.815 0 100-1.63h-3.87v-3.87A.815.815 0 0012 6.5z"
          fill="#FFF"
          fillRule="nonzero"
        />
      </g>
    </svg>
  );
}

export default PlusInSquareIcon;
