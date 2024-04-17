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

  const mouseXRef = useRef(0);

  useFrame(() => {
    if (!controlsRef.current || hasOpenedUi) {
      return;
    }

    controlsRef.current.setAzimuthalAngle(
      Math.PI - (Math.PI / 8) * mouseXRef.current,
    );

    controlsRef.current.update();
  });

  useEffect(() => {
    if (!isExpanded) {
      return undefined;
    }

    const handler = (event: MouseEvent) => {
      mouseXRef.current = (event.clientX / window.innerWidth) * 2 - 1;
    };

    window.addEventListener('mousemove', handler);

    return () => {
      window.removeEventListener('mousemove', handler);
      mouseXRef.current = 0;
    };
  }, [isExpanded]);

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
