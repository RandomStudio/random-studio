import { Sphere } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import {
  AmbientLight,
  DirectionalLight,
  HemisphereLight,
  Mesh,
  MeshBasicMaterial,
  Vector3,
} from 'three';
import { lerp } from 'three/src/math/MathUtils';
import { findStages } from '../../../../utils/skyUtils';
import { lerpColor } from '../../../../utils/animationUtils';

const Sun = ({
  elevation,
  sunPosition,
}: {
  elevation: number;
  sunPosition: Vector3;
}) => {
  const sphereRef = useRef<Mesh>(null);
  const targetRef = useRef<Mesh>(null);

  const lightRef = useRef<DirectionalLight>(null);
  const ambientLightRef = useRef<AmbientLight>(null);
  const hemisphereLightRef = useRef<HemisphereLight>(null);

  const [hasSetup, setHasSetup] = useState(false);

  useEffect(() => {
    if (!lightRef.current || hasSetup) {
      return;
    }

    const { currentStage } = findStages(elevation);
    const { lightColor, intensity } = currentStage;

    lightRef.current.color.copy(lightColor);
    lightRef.current.intensity = intensity;
    setHasSetup(true);
  }, [elevation, hasSetup]);

  useFrame(() => {
    if (
      !lightRef.current ||
      !sphereRef.current ||
      !ambientLightRef.current ||
      !hemisphereLightRef.current ||
      !targetRef.current ||
      !elevation
    ) {
      return;
    }

    lightRef.current.position.set(sunPosition.x, sunPosition.y, sunPosition.z);
    targetRef.current.position.set(0, 0, 8);
    lightRef.current.lookAt(0, 0, 8);
    sphereRef.current.position.copy(lightRef.current.position);

    const { currentStage, nextStage } = findStages(elevation);

    // Determine the transition progress between the current and next stage
    const elevationRange = nextStage.elevation - currentStage.elevation;

    const elevationProgress =
      (elevation - currentStage.elevation) / elevationRange;

    const delta = Number.isNaN(elevationProgress) ? 0 : elevationProgress;

    const interpolatedColor = lerpColor(
      currentStage.lightColor,
      nextStage.lightColor,
      delta,
    );

    const interpolatedIntensity = lerp(
      currentStage.intensity,
      nextStage.intensity,
      delta,
    );

    lightRef.current.color.copy(interpolatedColor);
    lightRef.current.intensity = interpolatedIntensity;

    ambientLightRef.current.intensity = Math.max(
      0.3 * interpolatedIntensity,
      0.1,
    );

    hemisphereLightRef.current.intensity = 0.5 * interpolatedIntensity;
    hemisphereLightRef.current.color.set(lightRef.current.color);

    // Update sphere material color
    if (sphereRef.current.material instanceof MeshBasicMaterial) {
      sphereRef.current.material.color.set(lightRef.current.color);
    }
  });

  return (
    <>
      <directionalLight ref={lightRef} />

      <ambientLight ref={ambientLightRef} />

      <hemisphereLight groundColor="#080820" ref={hemisphereLightRef} />

      <Sphere args={[1, 32, 32]} ref={sphereRef}>
        <meshBasicMaterial />
      </Sphere>

      <Sphere args={[1, 32, 32]} ref={targetRef} visible={false}>
        <meshBasicMaterial color="blue" />
      </Sphere>
    </>
  );
};

export default Sun;
