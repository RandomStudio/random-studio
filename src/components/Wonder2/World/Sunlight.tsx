import { Sphere } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { DirectionalLight, DirectionalLightHelper } from 'three';
import useHomeAssistant from '../useHomeAssistant';

function elevationAzimuthToXYZ(
  elevationDeg: number,
  azimuthDeg: number,
  radius: number = 1,
) {
  // Convert degrees to radians
  const elevationRad = ((90 - elevationDeg) * Math.PI) / 180;
  const azimuthRad = (azimuthDeg * Math.PI) / 180;

  // Corrected conversion to Cartesian coordinates
  const x = radius * Math.sin(elevationRad) * Math.cos(azimuthRad);
  const z = radius * Math.sin(elevationRad) * Math.sin(azimuthRad); // Z is forward/backward
  const y = radius * Math.cos(elevationRad); // Y is up/down

  return { x, y, z };
}

const SunLight = () => {
  const lightRef = useRef<DirectionalLight>();
  const sphereRef = useRef<typeof Sphere>();

  const latestState = useHomeAssistant('sun.sun');

  useFrame(() => {
    if (!lightRef.current || !latestState?.attributes) {
      return;
    }

    const { elevation, azimuth } = latestState.attributes;
    const sunPosition = elevationAzimuthToXYZ(elevation, azimuth, 10);

    lightRef.current.position.set(
      sunPosition.x,
      sunPosition.y + 5,
      sunPosition.z,
    );

    sphereRef.current.position.set(
      sunPosition.x,
      sunPosition.y + 5,
      sunPosition.z,
    );
  });

  return (
    <>
      <pointLight
        color={0xffffff}
        decay={1.5}
        distance={0}
        intensity={100}
        position={[0, Math.PI / 2, 1.5]}
        ref={lightRef}
        rotation={[0, 0, 0]}
      />

      <Sphere args={[1, 10, 10]} position={[0, 0, 0]} ref={sphereRef} />
    </>
  );
};

export default SunLight;
