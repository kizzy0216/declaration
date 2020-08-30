import * as React from "react";
import Svg, { Path } from 'react-native-svg';

function EmailSendIcon(props) {
  return (
    <Svg viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <Path d="M21.387 18.091h-11.24a2.43 2.43 0 01-2.43-2.43V8.43A2.43 2.43 0 0110.146 6h11.24a2.43 2.43 0 012.43 2.43v7.23a2.43 2.43 0 01-2.43 2.431zm-11.24-11.21c-.84 0-1.52.68-1.52 1.519v7.26c0 .84.68 1.52 1.52 1.52h11.24c.84 0 1.52-.68 1.52-1.52V8.43a1.519 1.519 0 00-1.52-1.519l-11.24-.03z" />
      <Path d="M9.691 8.734l5.742 5.59c.425.425 1.094-.243.668-.668l-5.742-5.59c-.425-.425-1.093.243-.668.668z" />
      <Path d="M16.101 14.324l5.742-5.59c.425-.425-.243-1.093-.668-.668l-5.742 5.59c-.425.425.243 1.093.668.668z" />
      <Path d="M21.813 15.509l-3.828-3.615c-.426-.426-1.094.243-.669.668l3.828 3.615c.426.426 1.094-.243.669-.668zM10.42 16.177l3.798-3.615c.455-.425-.213-1.094-.669-.668l-3.797 3.615c-.456.425.213 1.094.668.668zM6.47 8.825H.457a.486.486 0 000 .942H6.47a.486.486 0 000-.942zM6.47 11.56H1.61a.486.486 0 000 .941h4.86a.486.486 0 000-.942zM6.47 14.324H2.887a.486.486 0 000 .942h3.585a.486.486 0 000-.942z" />
    </Svg>
  );
}

export default EmailSendIcon;
