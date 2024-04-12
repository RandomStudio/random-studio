import { Sky as DreiSky } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { MathUtils, Mesh, ShaderMaterial, Vector3 } from 'three';
import Sun from './Sun/Sun';
import useHomeAssistant from '../../hooks/useHomeAssistant';
import { findStages } from '../../utils/skyUtils';
import { lerp } from '../../utils/animationUtils';

const centrePointVector = new Vector3(0, 0, -5);

const Sky = () => {
  const latestState = useHomeAssistant<
    string,
    { elevation: number; azimuth: number }
  >('sun.sun');

  const skyRef = useRef<Mesh & { material: ShaderMaterial }>(null);

  const { azimuth, elevation } = latestState?.attributes || {};

  const sunPosition = useMemo(() => {
    const phi = MathUtils.degToRad(90 - elevation);
    const theta = MathUtils.degToRad(azimuth);

    const position = new Vector3().setFromSphericalCoords(7, phi, theta);
    position.add(centrePointVector);

    return position;
  }, [elevation, azimuth]);

  useFrame(() => {
    // Adjust sky properties for a smooth transition
    if (!skyRef.current || !elevation) {
      return;
    }

    skyRef.current.material.uniforms.sunPosition.value.set(...sunPosition);

    const { currentStage, nextStage } = findStages(elevation);
    const elevationRange = nextStage.elevation - currentStage.elevation;

    const elevationProgress =
      (elevation - currentStage.elevation) / elevationRange;

    const delta = Number.isNaN(elevationProgress) ? 0 : elevationProgress;

    skyRef.current.material.uniforms.turbidity.value = lerp(
      currentStage.turbidity,
      nextStage.turbidity,
      delta,
    );

    skyRef.current.material.uniforms.rayleigh.value = lerp(
      currentStage.rayleigh,
      nextStage.rayleigh,
      delta,
    );

    skyRef.current.material.uniforms.mieCoefficient.value = lerp(
      currentStage.mieCoefficient,
      nextStage.mieCoefficient,
      delta,
    );
  });

  return (
    <>
      <DreiSky
        distance={450000}
        mieDirectionalG={0.8}
        ref={skyRef}
        sunPosition={sunPosition}
      />

      <Sun elevation={elevation} sunPosition={sunPosition} />
    </>
  );
};

export default Sky;
