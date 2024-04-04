import { PerspectiveCamera, RenderTexture } from '@react-three/drei';
import { Dispatch, RefObject, SetStateAction, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import classNames from 'classnames';
import { PCFSoftShadowMap } from 'three';
import styles from './Wonder2.module.css';
import World from './World/World';
import MorphingGeometry from './MorphingGeometry/MorphingGeometry';

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

  const width = isWonderFocused ? '100vw' : 'auto';

  useEffect(() => {
    const wonderScale = 200 / window.innerWidth;

    containerRef.current?.style.setProperty('--wonder-scale', `${wonderScale}`);
  }, [containerRef]);

  useEffect(() => {
    console.log(canvasRef.current.invalidate);
    canvasRef.current?.invalidate?.();
  }, [isWonderFocused]);

  const aspectRatio = window.innerWidth / window.innerHeight;
  const boxPosition = [0, 0, -4];

  return (
    <div className={canvasClassNames}>
      <Canvas
        gl={{
          physicallyCorrectLights: true,
          shadowMap: {
            enabled: true,
            type: PCFSoftShadowMap,
          },
        }}
        onClick={handleCanvasClick}
        ref={canvasRef}
        style={{
          width,
        }}
      >
        <MorphingGeometry
          args={[6 * aspectRatio, 6, 3, 32, 32]}
          isCube={isWonderFocused}
          position={boxPosition}
        >
          <meshBasicMaterial color="transparent" transparent>
            <RenderTexture anisotropy={4} attach="map">
              <ambientLight intensity={0.1} />

              <World isExpanded={isWonderFocused} />
            </RenderTexture>
          </meshBasicMaterial>
        </MorphingGeometry>
      </Canvas>
    </div>
  );
};

export default Wonder2;
