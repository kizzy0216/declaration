import React, { useState } from 'react';

import useAnimationFrame from './useAnimationFrame';

function useWindowSize() {
  const [position, setPosition] = useState({
    width: 0,
    height: 0,
  });

  useAnimationFrame(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    setPosition({
      width,
      height,
    });
  });

  return position;
}

export default useWindowSize;
