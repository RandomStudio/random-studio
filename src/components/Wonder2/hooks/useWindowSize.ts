import { useEffect, useState } from 'react';

const useWindowSize = () => {
  const isBrowser = typeof window !== 'undefined';

  const [state, setState] = useState<{ width: number; height: number }>({
    width: isBrowser ? window.innerWidth : 1,
    height: isBrowser ? window.innerHeight : 1,
  });

  useEffect(() => {
    if (!isBrowser) {
      return undefined;
    }

    const handler = () => {
      setState({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handler);

    return () => {
      window.removeEventListener('resize', handler);
    };
  }, [isBrowser]);

  return state;
};

export default useWindowSize;
