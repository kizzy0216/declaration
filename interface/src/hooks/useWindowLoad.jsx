import React, { useEffect, useState } from 'react';

function useWindowLoad() {
  const [hasLoaded, setHasLoaded] = useState(false);

  function handler () {
    setHasLoaded(true);
  }

  useEffect(() => {
    window.addEventListener('load', handler);
    return () => {
      window.removeEventListener('load', handler);
    }
  }, []);

  return hasLoaded;
}

export default useWindowLoad;
