import * as React from "react";
import Svg, { Path } from 'react-native-svg';

function LocationPinEditIcon(props) {
  return (
    <Svg width={16} height={16} viewBox="0 0 50 50" {...props}>
      <Path d="M41 17c0 2.102-.332 4.266-.898 6.422a6.06 6.06 0 00-2.29.672C38.551 21.664 39 19.258 39 17c0-7.762-6.238-14-14-14S11 9.238 11 17c0 6.59 3.64 14.25 7.344 20.188a86.566 86.566 0 003.46 5.14l-.683 2.418a92.034 92.034 0 01-4.465-6.496C12.86 32.164 9 24.309 9 17 9 8.16 16.16 1 25 1s16 7.16 16 16zm-9 1c0 3.855-3.145 7-7 7s-7-3.145-7-7 3.145-7 7-7 7 3.145 7 7zm-12 0c0 2.773 2.227 5 5 5s5-2.227 5-5-2.227-5-5-5-5 2.227-5 5zm0 0" />
      <Path d="M40.563 25.41c-.801 0-1.5.297-2.2.7-.199.199-.398.3-.601.5l-.2.199-.097.101-.3.297-12.403 12.5c-.098.102-.2.3-.297.402l-1.703 6c-.2.5.101 1.098.703 1.2.2.101.398.101.5 0l6-1.602c.2 0 .297-.098.5-.297l12.398-12.3.7-.7c.199-.203.3-.402.5-.703.101-.2.3-.398.402-.7.297-.698.398-1.597.2-2.3 0-.2-.102-.297-.2-.5 0-.098 0-.2-.102-.297-.101-.203-.199-.5-.398-.703-.102-.2-.3-.398-.5-.598-.602-.601-1.3-.902-2-1.101h-.102c-.199-.098-.5-.098-.8-.098.101 0 0 0 0 0zm-2.098 3.297l3 3-11.5 11.5-3-2.898zm-12.5 13.5l2.098 2.102-2.899.8zm0 0" />
    </Svg>
  );
}

export default LocationPinEditIcon;