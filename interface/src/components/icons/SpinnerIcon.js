import * as React from "react";

function SpinnerIcon(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        d="M21.956 12.314a10.285 10.285 0 00-.854-3.905 10.119 10.119 0 00-2.278-3.254 10.02 10.02 0 00-3.315-2.115 9.972 9.972 0 00-3.844-.692c-1.302.02-2.603.305-3.783.814A10.345 10.345 0 004.73 5.358a10.175 10.175 0 00-2.054 3.234 10.111 10.111 0 00-.65 3.722c.02 1.26.304 2.521.813 3.66a9.96 9.96 0 002.135 3.05 9.473 9.473 0 003.112 1.994 9.09 9.09 0 003.6.63 9.226 9.226 0 003.538-.772 9.62 9.62 0 002.949-2.055 9.026 9.026 0 001.912-3.01 8.336 8.336 0 00.528-2.094h.082c.712 0 1.281-.57 1.281-1.281-.02-.061-.02-.102-.02-.122zm-2.034 3.396a8.695 8.695 0 01-1.993 2.827 9.224 9.224 0 01-2.888 1.85 9.054 9.054 0 01-3.356.59 8.732 8.732 0 01-3.294-.732 8.323 8.323 0 01-2.725-1.932 8.424 8.424 0 01-1.77-2.786 8.415 8.415 0 01-.57-3.234 8.11 8.11 0 01.713-3.172 8.292 8.292 0 011.85-2.624 8.273 8.273 0 012.685-1.708 7.78 7.78 0 013.111-.53 7.86 7.86 0 013.051.692 7.916 7.916 0 012.522 1.79 7.822 7.822 0 011.627 2.583 7.91 7.91 0 01.508 2.99v.101c0 .671.509 1.2 1.14 1.281a8.54 8.54 0 01-.611 2.014z"
      />

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
