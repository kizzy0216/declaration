import React, { useRef } from 'react';

import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

function useAnimationFrame(callback) {
  const callbackRef = useRef(callback);
  useIsomorphicLayoutEffect(
    () => {
      callbackRef.current = callback;
    },
    [callback]
  );

  const loop = () => {
    frameRef.current = requestAnimationFrame(loop);
    const cb = callbackRef.current;
    cb();
  };

  const frameRef = useRef();
  useIsomorphicLayoutEffect(() => {
    frameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);
};

export default useAnimationFrame;
