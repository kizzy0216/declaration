import { useCallback } from 'react';

import debounce from '../utils/debounce';

export const useDebouncedCallback = (func, duration = 200) => {
  return useCallback(
    debounce(func, duration)
  , [func, duration]);
};

export default useDebouncedCallback;
