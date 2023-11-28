import {
  MouseEvent,
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import useLazyBoundingClientRect from './useLazyBoundingClientRect';

const useMouseHoverPosition = (
  ref: MutableRefObject<HTMLElement | null>,
  isActive = true,
) => {
  const [isHovering, setIsHovering] = useState(false);

  const [position, setPosition] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const elementBoundingRectRef = useLazyBoundingClientRect(
    ref,
    isHovering && isActive,
  );

  const handleMouseOver = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseOut = useCallback(() => {
    setIsHovering(false);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isHovering || !elementBoundingRectRef.current) {
        return;
      }

      const { left, width, top, height } = elementBoundingRectRef.current;

      setPosition({
        width,
        height,
        x: e.pageX - (left + window.scrollX),
        y: e.pageY - (top + window.scrollY),
      });
    },
    [elementBoundingRectRef, isHovering],
  );

  useEffect(() => {
    if (!isActive || !ref || !ref.current) {
      return undefined;
    }

    const element = ref.current;
    element.addEventListener('mouseover', handleMouseOver);
    element.addEventListener('mouseout', handleMouseOut);
    // @ts-expect-error Mousemove has an unusual signature
    element.addEventListener('mousemove', handleMouseMove);

    return () => {
      element.removeEventListener('mouseover', handleMouseOver);
      element.removeEventListener('mouseout', handleMouseOut);
      // @ts-expect-error Mousemove has an unusual signature
      element.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove, handleMouseOut, handleMouseOver, isActive, ref]);

  return useMemo(
    () => [isHovering, position] as [boolean, typeof position],
    [isHovering, position],
  );
};

export default useMouseHoverPosition;
