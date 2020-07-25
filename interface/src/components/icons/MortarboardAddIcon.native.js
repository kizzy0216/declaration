import * as React from "react";
import Svg, { Path } from 'react-native-svg';

function MortarboardAddIcon(props) {
  return (
    <Svg width={16} height={16} viewBox="0 0 50 50" {...props}>
      <Path d="M25.477 2.121l24 13a1 1 0 01.05 1.727L38.75 23.586a21.182 21.182 0 011.703 3.762 11.813 11.813 0 00-2.336-.535 18.558 18.558 0 00-1.062-2.168l-4.45 2.777a12.058 12.058 0 00-4.308 2.695l-2.77 1.73a.989.989 0 01-1.054 0l-11.528-7.202c-2.101 3.675-2.87 7.878-2.914 13.687 7.043.176 12.414 2.059 14.969 5.219.14-.176.29-.344.45-.512.241.625.534 1.223.874 1.793a5.077 5.077 0 00-.453.656.999.999 0 01-1.742 0c-1.54-2.734-7.2-5.226-15.129-5.23a.992.992 0 01-.996-.992c-.043-6.528.777-11.403 3.25-15.68L4 19.05v12.137c1.156.417 2 1.519 2 2.812 0 .578-.184 1.012-.398 1.492-.211.48-.477.969-.739 1.422-.52.902-1.043 1.656-1.043 1.656L3 39.762l-.82-1.192s-.524-.754-1.043-1.656a14.847 14.847 0 01-.739-1.422C.184 35.012 0 34.578 0 34c0-1.293.844-2.395 2-2.813V17.802l-1.527-.953a1 1 0 01.05-1.727l24-13a1 1 0 01.954 0zM2.984 16.063L25 29.82l22.016-13.758L25 4.137zM2 34c0-.027.066.316.227.688.164.37.398.812.636 1.222.07.117.07.106.137.215.066-.11.066-.098.133-.215.242-.41.476-.851.637-1.222.164-.372.23-.715.23-.688 0-.555-.445-1-1-1-.555 0-1 .445-1 1zm0 0" />
      <Path d="M42.543 38.723c0 .597-.402 1-1 1h-3.902v3.898c0 .602-.399 1-1 1-.598 0-1-.398-1-1v-3.898h-3.899c-.601 0-1-.403-1-1 0-.602.399-1 1-1h3.899V33.82c0-.597.402-1 1-1 .601 0 1 .403 1 1v3.903h3.902c.598 0 1 .398 1 1zm4.098 0c0 5.5-4.5 10-10 10s-10-4.5-10-10 4.5-10 10-10 10 4.5 10 10zm-2 0c0-4.403-3.598-8-8-8-4.399 0-8 3.597-8 8 0 4.398 3.601 8 8 8 4.402 0 8-3.602 8-8zm0 0" />
    </Svg>
  );
}

export default MortarboardAddIcon;
