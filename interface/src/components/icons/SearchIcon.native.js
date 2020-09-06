import * as React from "react";
import Svg, { Path } from 'react-native-svg';

function SearchIcon(props) {
  return (
    <Svg viewBox="0 0 24 24" width={16} height={16} {...props}>
      <Path
        d="M21.604 20.496l-3.665-3.665c2.843-3.543 2.72-8.969-.522-12.187A8.982 8.982 0 0011.03 2c-2.42 0-4.665.948-6.387 2.644A8.982 8.982 0 002 11.031c0 2.42.948 4.665 2.644 6.386a8.982 8.982 0 006.387 2.644c2.045 0 4.203-.85 5.8-2.122l3.58 3.665c.199.2.852.681 1.371.203.4-.424.196-.912-.178-1.311zm-3.027-9.49a7.49 7.49 0 01-7.522 7.52 7.49 7.49 0 01-7.52-7.52 7.49 7.49 0 017.52-7.522 7.49 7.49 0 017.522 7.522z"
        fill={props.fill}
        fillRule="nonzero"
      />
    </Svg>
  );
}

export default SearchIcon;
