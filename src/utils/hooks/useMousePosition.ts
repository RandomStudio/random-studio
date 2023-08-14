import React from 'react';

type PositionType = {
  x: number | null;
  y: number | null;
};

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = React.useState<PositionType>({
    x: null,
    y: null,
  });

  React.useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({
        x: ev.clientX,
        y: ev.clientY,
      });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  console.log(mousePosition.x);

  return mousePosition as PositionType;
};

export default useMousePosition;
