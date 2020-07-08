import * as React from "react";

function FlagIcon(props) {
  return (
    <svg viewBox="0 0 50 50" width="1em" height="1em" {...props}>
      <path d="M13 0C7.977 0 4.879.496 3 1.031c-.941.266-1.578.555-2 .782-.137.074-.21.152-.313.218-.023.016-.07.016-.093.031a.958.958 0 00-.281.22H.28l-.031.062a.532.532 0 00-.094.094L0 2.562v.25a.668.668 0 000 .126V49c-.004.36.184.695.496.879.313.18.695.18 1.008 0 .312-.184.5-.52.496-.879V30.656c.418-.168 1.047-.402 2.188-.687C6.093 29.489 9.015 29 13 29c3.902 0 6.797.96 10.313 1.969C26.828 31.977 30.922 33 37 33c7.023 0 12.5-3.125 12.5-3.125l.5-.281V2.312l-1.469.813C47.711 3.57 43.011 6 37 6c-4.777 0-8.11-1.406-11.625-2.906C21.859 1.594 18.16 0 13 0zm0 2c4.754 0 8.078 1.406 11.594 2.906C28.109 6.406 31.824 8 37 8c5.383 0 9.113-1.594 11-2.5v22.844C47.316 28.71 42.95 31 37 31c-5.852 0-9.688-.977-13.156-1.969C20.375 28.04 17.23 27 13 27c-4.148 0-7.219.512-9.281 1.031-1.114.282-1.188.383-1.719.594V3.531c.285-.148.773-.34 1.563-.562C5.202 2.504 8.108 2 13 2z" />
    </svg>
  );
}

export default FlagIcon;
