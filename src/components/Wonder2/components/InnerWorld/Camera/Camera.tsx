import { useSpring } from '@react-spring/web';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { type PerspectiveCamera as PerspectiveCameraType } from 'three';
import type { OrbitControls as OrbitControlsType } from 'three-stdlib';
import UICameraPositionAnimator from './UICameraPositionAnimator/UICameraPositionAnimator';

type CameraProps = {
  hasOpenedUi: boolean;
  isExpanded: boolean;
};

const Camera = ({ hasOpenedUi, isExpanded }: CameraProps) => {
  const cameraRef = useRef<PerspectiveCameraType>(null);

  const [spring] = useSpring(
    {
      fov: isExpanded ? 39.598 : 3,
    },
    [isExpanded],
  );

  useFrame(() => {
    if (!cameraRef.current) {
      return;
    }

    cameraRef.current.fov = spring.fov.get();

    cameraRef.current.updateProjectionMatrix();
  });

  const controlsRef = useRef<OrbitControlsType>(null);
  const [rotateDirection, setRotateDirection] = useState(1); // 1 for clockwise, -1 for counter-clockwise

  const mouseXRef = useRef(0);

  useFrame(() => {
    if (!controlsRef.current || hasOpenedUi) {
      return;
    }

    const azimuthalAngle = controlsRef.current.getAzimuthalAngle();

    // Check and reverse direction at boundaries
    if (azimuthalAngle === rotateDirection * (Math.PI - Math.PI / 4)) {
      setRotateDirection(-1 * rotateDirection);
    }

    controlsRef.current.setAzimuthalAngle(
      Math.PI + (Math.PI / 4) * mouseXRef.current,
    );

    // Update the azimuth angle to make the rotation go back and forth
    controlsRef.current.autoRotateSpeed = 0.1 * rotateDirection;
    controlsRef.current.update();
  });

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      mouseXRef.current = (event.clientX / window.innerWidth) * 2 - 1;
    };

    window.addEventListener('mousemove', handler);

    return () => {
      window.removeEventListener('mousemove', handler);
    };
  }, []);

  return (
    <>
      <PerspectiveCamera
        far={1000}
        makeDefault
        near={0.1}
        position={[-0.067, 3, -14.281]}
        ref={cameraRef}
        rotation={[Math.PI / -0.5, 0.009, -3.14]}
      />

      <UICameraPositionAnimator
        cameraRef={cameraRef}
        hasOpenedUi={hasOpenedUi}
      />

      {!hasOpenedUi && (
        <OrbitControls
          autoRotate={false}
          autoRotateSpeed={1}
          enableDamping
          enablePan={false}
          enableRotate={false}
          enableZoom={false}
          maxAzimuthAngle={Math.PI + Math.PI / 4}
          maxPolarAngle={Math.PI / 2.2}
          minAzimuthAngle={Math.PI - Math.PI / 4}
          minPolarAngle={Math.PI / 2.2}
          ref={controlsRef}
        />
      )}
    </>
  );
};

export default Camera;
