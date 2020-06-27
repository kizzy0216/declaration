//https://fb.me/react-uselayouteffect-ssr

import React, { useEffect, useLayoutEffect } from 'react';

const useIsomorphicLayoutEffect = (
  typeof window !== 'undefined'
    ? useLayoutEffect
    : useEffect
);

export default useIsomorphicLayoutEffect;
