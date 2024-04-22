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
  const controlsRef = useRef<OrbitControlsType>(null);

  const [hasClosedUi, setHasClosedUi] = useState(false);

  useEffect(() => {
    if (hasOpenedUi) {
      setHasClosedUi(false);
    }
  }, [hasOpenedUi]);

  const [spring] = useSpring(
    {
      fov: isExpanded ? 39.598 : 3,
      x: Math.PI,
      y: Math.PI / 2.2,
    },
    [isExpanded],
  );

  useFrame(({ clock }) => {
    if (!cameraRef.current) {
      return;
    }

    if (!isExpanded) {
      spring.fov.start(3 + Math.cos(clock.getElapsedTime()));
    }

    cameraRef.current.fov = spring.fov.get();

    cameraRef.current.updateProjectionMatrix();
  });

  useEffect(() => {
    if (!isExpanded || hasOpenedUi) {
      return undefined;
    }

    const handler = (event: MouseEvent) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      spring.x.start(Math.PI - (Math.PI / 8) * mouseX);
    };

    window.addEventListener('mousemove', handler);

    return () => {
      window.removeEventListener('mousemove', handler);
      spring.x.start(Math.PI);
    };
  }, [hasOpenedUi, isExpanded, spring.x]);

  return (
    <>
      <PerspectiveCamera
        far={1000}
        makeDefault
        near={0.1}
        position={[-0.067, 3, -13.281]}
        ref={cameraRef}
        rotation={[Math.PI / -0.5, 0.009, -3.14]}
      />

      <UICameraPositionAnimator
        cameraRef={cameraRef}
        hasClosedUi={hasClosedUi}
        hasOpenedUi={hasOpenedUi}
        setHasClosedUi={setHasClosedUi}
      />

      {!hasOpenedUi && hasClosedUi && (
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
