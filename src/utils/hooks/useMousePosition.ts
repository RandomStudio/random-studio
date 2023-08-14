import React, { useCallback } from 'react';

type PositionType = {
  x: number | null;
  y: number | null;
};

const useMousePosition = parentElement => {
  const [mousePosition, setMousePosition] = React.useState<PositionType>({
    x: null,
    y: null,
  });

  const updateMousePosition = useCallback((ev: MouseEvent, parent) => {
    const mouseX = ev.clientX;
    const mouseY = ev.clientY;

    const offsetTop = parent.getBoundingClientRect().top;

    setMousePosition({
      x: mouseX,
      y: mouseY - offsetTop,
    });
  }, []);

  React.useEffect(() => {
    if (!parentElement) {
      return undefined;
    }

    window.addEventListener('mousemove', e =>
      updateMousePosition(e, parentElement),
    );

    return () => {
      window.removeEventListener('mousemove', e =>
        updateMousePosition(e, parentElement),
      );
    };
  }, [parentElement, updateMousePosition]);

  return mousePosition as PositionType;
};

export default useMousePosition;
