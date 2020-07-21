import * as React from "react";
import Svg, { Path } from 'react-native-svg';

function VennDiagramIcon(props) {
  return (
    <Svg viewBox="0 0 50 50" width="1em" height="1em" {...props}>
      <Path d="M33 9c-2.914 0-5.645.797-8 2.164A15.892 15.892 0 0017 9C8.18 9 1 16.18 1 25s7.18 16 16 16c2.914 0 5.645-.797 8-2.164A15.892 15.892 0 0033 41c8.82 0 16-7.18 16-16S41.82 9 33 9zM17 39C9.281 39 3 32.719 3 25s6.281-14 14-14c2.2 0 4.277.523 6.129 1.434C19.406 15.364 17 19.902 17 25c0 5.098 2.406 9.637 6.129 12.566A13.857 13.857 0 0117 39zm8-3a.97.97 0 00-.46.129 14.05 14.05 0 01-1.735-1.566A.969.969 0 0023 34a1 1 0 00-1-1c-.145 0-.281.035-.406.09a13.897 13.897 0 01-2.543-7.102A.992.992 0 0020 25a.992.992 0 00-.95-.988 13.897 13.897 0 012.544-7.102c.125.055.261.09.406.09a1 1 0 001-1 .969.969 0 00-.195-.563 14.34 14.34 0 011.734-1.566A.97.97 0 0025 14a.97.97 0 00.46-.129c.622.477 1.204.996 1.735 1.566A.969.969 0 0027 16a1 1 0 001 1c.145 0 .281-.035.406-.09a13.897 13.897 0 012.543 7.102A.992.992 0 0030 25c0 .535.422.96.95.988a13.897 13.897 0 01-2.544 7.102A1.012 1.012 0 0028 33a1 1 0 00-1 1c0 .215.082.402.195.563a14.34 14.34 0 01-1.734 1.566A.97.97 0 0025 36zm8 3c-2.2 0-4.277-.523-6.129-1.434C30.594 34.636 33 30.098 33 25c0-5.098-2.406-9.637-6.129-12.566A13.857 13.857 0 0133 11c7.719 0 14 6.281 14 14s-6.281 14-14 14zm-7-8a1 1 0 11-1.999.001A1 1 0 0126 31zm-3-9a1 1 0 11-1.999.001A1 1 0 0123 22zm0 6a1 1 0 11-1.999.001A1 1 0 0123 28zm4-6a1 1 0 111.999-.001A1 1 0 0127 22zm0 6a1 1 0 111.999-.001A1 1 0 0127 28zm-1-9a1 1 0 11-1.999.001A1 1 0 0126 19zm0 6a1 1 0 11-1.999.001A1 1 0 0126 25z" />
    </Svg>
  );
}

export default VennDiagramIcon;