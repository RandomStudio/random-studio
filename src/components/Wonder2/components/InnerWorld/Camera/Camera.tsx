import { useSpring } from '@react-spring/web';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
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

  const [spring] = useSpring(
    {
      fov: isExpanded ? 39.598 : 3,
      x: !hasOpenedUi && isExpanded ? Math.PI : 0,
    },
    [hasOpenedUi, isExpanded],
  );

  useFrame(() => {
    if (!cameraRef.current) {
      return;
    }

    cameraRef.current.fov = spring.fov.get();

    cameraRef.current.updateProjectionMatrix();
  });

  useFrame(() => {
    if (!controlsRef.current || hasOpenedUi) {
      return;
    }

    controlsRef.current.setAzimuthalAngle(spring.x.get());

    controlsRef.current.update();
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
    };
  }, [hasOpenedUi, isExpanded, spring.x]);

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
