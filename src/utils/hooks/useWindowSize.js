import { useState, useEffect } from 'react';

const isClient = typeof window === 'object';

function getSize() {
  return {
    dpr: isClient ? window.devicePixelRatio : undefined,
    height: isClient ? window.innerHeight : undefined,
    width: isClient ? window.innerWidth : undefined,
  };
}

function useWindowSize() {
  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}

export default useWindowSize;
