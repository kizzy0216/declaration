import React, { useState } from 'react';

import useAnimationFrame from './useAnimationFrame';

function useWindowScrollPosition() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  useAnimationFrame(() => {
    const x = window.pageXOffset;
    const y = window.pageYOffset;

    setPosition({
      x,
      y,
    });
  });

  return position;
}

export default useWindowScrollPosition;
