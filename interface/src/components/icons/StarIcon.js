import * as React from "react";

function StarIcon(props) {
  return (
    <svg width="15px" height="15px" viewbox="0 0 15 15" style={{overflow: 'visible'}} {...props}>
      <path d="M14.8745 5.38998C14.8259 5.24011 14.6969 5.13047 14.5411 5.10664L9.90115 4.42998L7.82615 0.231644C7.75583 0.0897611 7.61116 1.4803e-16 7.45281 0C7.29446 -1.4803e-16 7.1498 0.0897611 7.07948 0.231644L5.00448 4.42998L0.366146 5.09664C0.204481 5.1164 0.0691452 5.22853 0.0196894 5.38371C-0.0297665 5.53889 0.0157248 5.70865 0.136146 5.81831L3.49281 9.09664L2.70115 13.7083C2.67386 13.8649 2.73803 14.0233 2.86656 14.1168C2.99509 14.2103 3.1656 14.2225 3.30615 14.1483L7.45281 11.9666L11.6011 14.1466C11.7417 14.2208 11.9122 14.2086 12.0407 14.1151C12.1693 14.0217 12.2334 13.8632 12.2061 13.7066L11.4128 9.09664L14.7695 5.81831C14.8834 5.70728 14.9241 5.54109 14.8745 5.38998Z" transform="translate(0.047187537 0.07002252)" id="Path" fill="none" fillRule="evenodd" stroke="#222222" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
    // <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    //   <path
    //     stroke={props.fill}
    //     strokeWidth={1.5}
    //     d="M12 2.49l3.09 6.26L22 9.76l-5 4.87 1.18 6.88L12 18.26l-6.18 3.25L7 14.63 2 9.76l6.91-1.01z"
    //     fill="none"
    //     fillRule="evenodd"
    //     strokeLinecap="round"
    //     strokeLinejoin="round"
    //   />
    // </svg>
  );
}

export default StarIcon;
