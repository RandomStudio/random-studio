import { useSpring } from '@react-spring/web';
import { PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type { PerspectiveCamera as PerspectiveCameraType } from 'three';

type CameraProps = {
  isExpanded: boolean;
};

const Camera = ({ isExpanded }: CameraProps) => {
  const cameraRef = useRef<PerspectiveCameraType>(null);

  const [spring] = useSpring(
    {
      fov: isExpanded ? 39.598 : 3,
    },
    [isExpanded],
  );

  useFrame(({ clock }) => {
    if (!cameraRef.current) {
      return;
    }

    cameraRef.current.fov = spring.fov.get();

    if (!isExpanded) {
      cameraRef.current.fov += Math.sin(clock.elapsedTime);
    }

    cameraRef.current.updateProjectionMatrix();
  });

  return (
    <PerspectiveCamera
      far={1000}
      makeDefault
      near={0.1}
      position={[-0.067, 1.026, -14.281]}
      ref={cameraRef}
      rotation={[-3.125 + 0.15, 0.009, -3.14]}
    />
  );
};

export default Camera;
