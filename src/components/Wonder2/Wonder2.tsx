import { Box, Sphere } from '@react-three/drei';
import { Dispatch, RefObject, SetStateAction, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import classNames from 'classnames';
import styles from './Wonder2.module.css';

type Wonder2Props = {
  containerRef: RefObject<HTMLDivElement>;
  isWonderFocused: boolean;
  setIsWonderFocused: Dispatch<SetStateAction<boolean>>;
};

const Wonder2 = ({
  containerRef,
  isWonderFocused,
  setIsWonderFocused,
}: Wonder2Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const canvasClassNames = classNames(styles.canvas, {
    [styles.isFocused]: isWonderFocused,
  });

  const handleCanvasClick = () => {
    setIsWonderFocused(isCurrentlyFocused => !isCurrentlyFocused);
  };

  useEffect(() => {
    const wonderScale = 200 / window.innerWidth;

    containerRef.current?.style.setProperty('--wonder-scale', `${wonderScale}`);
  }, [containerRef]);

  return (
    <div className={canvasClassNames}>
      <Canvas onClick={handleCanvasClick} ref={canvasRef}>
        <Box args={[2, 2, 2]} rotation={[0, 1, 0]}>
          <meshBasicMaterial color="green" />
        </Box>

        <Sphere args={[1, 16, 16]} position={[-2, 0, 0]}>
          <meshBasicMaterial color="hotpink" />
        </Sphere>

        <Box
          args={[2, 2, 2]}
          position={[2, 0, 0]}
          rotation={[0.25, 0.25, 0.25]}
        >
          <meshBasicMaterial color="yellow" />
        </Box>
      </Canvas>
    </div>
  );
};

export default Wonder2;
