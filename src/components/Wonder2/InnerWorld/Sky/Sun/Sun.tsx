import { Sphere } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { MutableRefObject, useRef } from 'react';
import {
  AmbientLight,
  Color,
  DirectionalLight,
  HemisphereLight,
  Mesh,
  MeshBasicMaterial,
  Vector3,
} from 'three';
import { DAY_NIGHT_CYCLE_STAGE } from '../../constants';

// Assuming imports are done

// Define detailed colors for each stage
const COLORS = {
  DEEP_NIGHT: new Color(0x181818),
  ASTRONOMICAL_TWILIGHT: new Color(0x483d8b),
  NAUTICAL_TWILIGHT: new Color(0x6495ed),
  CIVIL_TWILIGHT: new Color(0xffdab9),
  SUNRISE_SUNSET: new Color(0xffa07a),
  DAYTIME: new Color(0xffeeb1),
};

// Define detailed intensities for each stage
const INTENSITIES = {
  DEEP_NIGHT: 0.05,
  ASTRONOMICAL_TWILIGHT: 0.1,
  NAUTICAL_TWILIGHT: 0.3,
  CIVIL_TWILIGHT: 0.5,
  SUNRISE_SUNSET: 0.8,
  DAYTIME: 1.0,
};

// Helper functions to determine color and intensity
const getStageForElevation = (
  elevation: number,
): keyof typeof DAY_NIGHT_CYCLE_STAGE => {
  if (elevation < -18) {
    return 'DEEP_NIGHT';
  }

  if (elevation < -12) {
    return 'ASTRONOMICAL_TWILIGHT';
  }

  if (elevation < -6) {
    return 'NAUTICAL_TWILIGHT';
  }

  if (elevation < 0) {
    return 'CIVIL_TWILIGHT';
  }

  if (elevation === 0) {
    return 'SUNRISE_SUNSET';
  }

  return 'DAYTIME';
};

const getColorForElevation = (elevation: number): Color => {
  const stage = getStageForElevation(elevation);

  return COLORS[stage];
};

const getIntensityForElevation = (elevation: number): number => {
  const stage = getStageForElevation(elevation);

  return INTENSITIES[stage];
};

const lerp = (current: number, target: number, fraction: number) => {
  return current + (target - current) * fraction;
};

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

  useFrame(() => {
    if (
      !lightRef.current ||
      !sphereRef.current ||
      !ambientLightRef.current ||
      !hemisphereLightRef.current ||
      !targetRef.current
    ) {
      return;
    }

    lightRef.current.position.set(sunPosition.x, sunPosition.y, sunPosition.z);

    targetRef.current.position.set(0, 0, 8);
    lightRef.current.lookAt(0, 0, 8);
    sphereRef.current.position.copy(lightRef.current.position);

    const sunColor = getColorForElevation(elevation);
    const intensity = getIntensityForElevation(elevation);

    const currentIntensity = lerp(lightRef.current.intensity, intensity, 0.01);
    const currentColorR = lerp(lightRef.current.color.r, sunColor.r, 0.01);
    const currentColorG = lerp(lightRef.current.color.g, sunColor.g, 0.01);
    const currentColorB = lerp(lightRef.current.color.b, sunColor.b, 0.01);

    // Adjust light properties based on the current stage
    lightRef.current.intensity = currentIntensity;
    lightRef.current.color.setRGB(currentColorR, currentColorG, currentColorB);

    ambientLightRef.current.intensity = Math.max(0.3 * currentIntensity, 0.1); // Adjusted for ambient light
    hemisphereLightRef.current.intensity = 0.5 * currentIntensity; // Adjusted for hemisphere light
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
