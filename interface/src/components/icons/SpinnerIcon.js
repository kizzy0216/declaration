import * as React from "react";

function SpinnerIcon(props) {
  return (
    <svg viewBox="0 0 30 30" width="1em" height="1em" {...props}>
      <path d="M15.5 3A3.5 3.5 0 0012 6.5a3.5 3.5 0 003.5 3.5A3.5 3.5 0 0019 6.5 3.5 3.5 0 0015.5 3zM7 7a3 3 0 00-3 3 3 3 0 003 3 3 3 0 003-3 3 3 0 00-3-3zm16 2a1 1 0 00-1 1 1 1 0 001 1 1 1 0 001-1 1 1 0 00-1-1zm2 4.75A1.25 1.25 0 0023.75 15 1.25 1.25 0 0025 16.25 1.25 1.25 0 0026.25 15 1.25 1.25 0 0025 13.75zM5.5 15A2.5 2.5 0 003 17.5 2.5 2.5 0 005.5 20 2.5 2.5 0 008 17.5 2.5 2.5 0 005.5 15zM23 19a2 2 0 00-2 2 2 2 0 002 2 2 2 0 002-2 2 2 0 00-2-2zm-13 3a2 2 0 00-2 2 2 2 0 002 2 2 2 0 002-2 2 2 0 00-2-2zm7 1a2 2 0 00-2 2 2 2 0 002 2 2 2 0 002-2 2 2 0 00-2-2z" />

      <style jsx>{`
        svg {
          animation-name: spinner;
          animation-duration: 1s;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
          transform-origin: 50% 50%;
        }

        @keyframes spinner {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </svg>
  );
}

export default SpinnerIcon;
