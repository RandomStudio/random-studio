import { MutableRefObject, useEffect, useRef } from 'react';

const useLazyBoundingClientRect = (
  targetRef: MutableRefObject<HTMLElement>,
  isActive = true,
) => {
  const boundingRectRef = useRef<DOMRect>(null);

  useEffect(() => {
    if (!isActive) {
      return undefined;
    }

    const handleGetBoundingClientRect = () => {
      if (!targetRef.current) {
        return;
      }

      boundingRectRef.current = targetRef.current.getBoundingClientRect();
    };

    window.addEventListener('scroll', handleGetBoundingClientRect, {
      passive: true,
    });

    handleGetBoundingClientRect();

    return () => {
      window.removeEventListener('scroll', handleGetBoundingClientRect);
    };
  }, [isActive, targetRef]);

  return boundingRectRef;
};

export default useLazyBoundingClientRect;
