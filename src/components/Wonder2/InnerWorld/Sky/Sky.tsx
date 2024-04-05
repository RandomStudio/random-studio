import { Sky as DreiSky } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { MathUtils, Mesh, ShaderMaterial, Vector3 } from 'three';
import Sun from './Sun/Sun';
import useHomeAssistant from '../../hooks/useHomeAssistant';
import { DAY_NIGHT_CYCLE_STAGE, DAY_NIGHT_CYCLE_STAGES } from '../constants';

// Function to calculate interpolated values based on current elevation
const interpolateSkyValue = (
  currentElevation: number,
  keyPoints: { elevation: number; value: number }[],
) => {
  const elevationRange = keyPoints.map(point => point.elevation);
  const valuesRange = keyPoints.map(point => point.value);

  // Find the two closest elevation points
  const lowerBoundIndex = elevationRange.reduce(
    (prevIndex, currElevation, index) =>
      currElevation <= currentElevation &&
        (prevIndex === null || currElevation > elevationRange[prevIndex])
        ? index
        : prevIndex,
    0,
  );

  const upperBoundIndex =
    lowerBoundIndex !== null && lowerBoundIndex < elevationRange.length - 1
      ? lowerBoundIndex + 1
      : lowerBoundIndex;

  if (lowerBoundIndex === null || upperBoundIndex === null) {
    return valuesRange[0];
  } // Default to first value if out of bounds

  const lowerElevation = elevationRange[lowerBoundIndex];
  const upperElevation = elevationRange[upperBoundIndex];
  const lowerValue = valuesRange[lowerBoundIndex];
  const upperValue = valuesRange[upperBoundIndex];

  // Linear interpolation
  const ratio =
    (currentElevation - lowerElevation) / (upperElevation - lowerElevation);

  return lowerValue + ratio * (upperValue - lowerValue);
};

// Define key elevation points and corresponding values for sky uniforms
const keyPoints = {
  turbidity: [
    {
      elevation: DAY_NIGHT_CYCLE_STAGES[DAY_NIGHT_CYCLE_STAGE.DEEP_NIGHT][0],
      value: 2,
    },
    {
      elevation:
        DAY_NIGHT_CYCLE_STAGES[DAY_NIGHT_CYCLE_STAGE.ASTRONOMICAL_TWILIGHT][0],
      value: 6,
    },
    {
      elevation:
        DAY_NIGHT_CYCLE_STAGES[DAY_NIGHT_CYCLE_STAGE.NAUTICAL_TWILIGHT][0],
      value: 10,
    },
    {
      elevation:
        DAY_NIGHT_CYCLE_STAGES[DAY_NIGHT_CYCLE_STAGE.CIVIL_TWILIGHT][0],
      value: 20,
    },
    {
      elevation:
        DAY_NIGHT_CYCLE_STAGES[DAY_NIGHT_CYCLE_STAGE.SUNRISE_SUNSET][0],
      value: 10,
    }, // Assuming single point for sunrise/sunset
    {
      elevation: DAY_NIGHT_CYCLE_STAGES[DAY_NIGHT_CYCLE_STAGE.DAYTIME][1],
      value: 6,
    },
  ],
  rayleigh: [
    {
      elevation: DAY_NIGHT_CYCLE_STAGES[DAY_NIGHT_CYCLE_STAGE.DEEP_NIGHT][0],
      value: 0.2,
    },
    {
      elevation:
        DAY_NIGHT_CYCLE_STAGES[DAY_NIGHT_CYCLE_STAGE.ASTRONOMICAL_TWILIGHT][0],
      value: 0.5,
    },
    {
      elevation:
        DAY_NIGHT_CYCLE_STAGES[DAY_NIGHT_CYCLE_STAGE.NAUTICAL_TWILIGHT][0],
      value: 1,
    },
    {
      elevation:
        DAY_NIGHT_CYCLE_STAGES[DAY_NIGHT_CYCLE_STAGE.CIVIL_TWILIGHT][0],
      value: 2,
    },
    {
      elevation:
        DAY_NIGHT_CYCLE_STAGES[DAY_NIGHT_CYCLE_STAGE.SUNRISE_SUNSET][0],
      value: 10,
    },
    {
      elevation: DAY_NIGHT_CYCLE_STAGES[DAY_NIGHT_CYCLE_STAGE.DAYTIME][1],
      value: 1,
    },
  ],

  mieCoefficient: [
    {
      elevation: DAY_NIGHT_CYCLE_STAGES[DAY_NIGHT_CYCLE_STAGE.DEEP_NIGHT][0],
      value: 0.0005,
    },
    // During twilight and day, the mieCoefficient might slightly increase due to more particles and moisture in the air
    {
      elevation:
        DAY_NIGHT_CYCLE_STAGES[DAY_NIGHT_CYCLE_STAGE.ASTRONOMICAL_TWILIGHT][0],
      value: 0.0008,
    },
    {
      elevation:
        DAY_NIGHT_CYCLE_STAGES[DAY_NIGHT_CYCLE_STAGE.NAUTICAL_TWILIGHT][0],
      value: 0.001,
    },
    {
      elevation:
        DAY_NIGHT_CYCLE_STAGES[DAY_NIGHT_CYCLE_STAGE.CIVIL_TWILIGHT][0],
      value: 0.002,
    },
    {
      elevation:
        DAY_NIGHT_CYCLE_STAGES[DAY_NIGHT_CYCLE_STAGE.SUNRISE_SUNSET][0],
      value: 0.005,
    },
    {
      elevation: DAY_NIGHT_CYCLE_STAGES[DAY_NIGHT_CYCLE_STAGE.DAYTIME][1],
      value: 0.005,
    },
  ],
};

const centrePointVector = new Vector3(0, 0, -5);

const Sky = () => {
  const latestState = useHomeAssistant('sun.sun') as {
    attributes: { elevation: number; azimuth: number };
  };

  const skyRef = useRef<Mesh & { material: ShaderMaterial }>(null);

  const { elevation, azimuth } = latestState?.attributes || {};

  const sunPositionRef = useRef<Vector3>(new Vector3());

  useFrame(() => {
    const phi = MathUtils.degToRad(90 - elevation);
    const theta = MathUtils.degToRad(azimuth);

    sunPositionRef.current.setFromSphericalCoords(7, phi, theta);
    sunPositionRef.current.add(centrePointVector);
  });

  useFrame(() => {
    // Adjust sky properties for a smooth transition
    if (!skyRef.current) {
      return;
    }

    // Apply interpolated values to the sky's material uniforms
    skyRef.current.material.uniforms.turbidity.value = interpolateSkyValue(
      elevation,
      keyPoints.turbidity,
    );

    skyRef.current.material.uniforms.rayleigh.value = interpolateSkyValue(
      elevation,
      keyPoints.rayleigh,
    );

    skyRef.current.material.uniforms.mieCoefficient.value = interpolateSkyValue(
      elevation,
      keyPoints.mieCoefficient,
    );

    skyRef.current.material.uniforms.sunPosition.value.set(
      ...sunPositionRef.current,
    );
  });

  return (
    <>
      <DreiSky
        distance={450000}
        mieDirectionalG={0.8}
        ref={skyRef}
        sunPosition={[0, 1, 0]}
      />

      <Sun elevation={elevation} sunPositionRef={sunPositionRef} />
    </>
  );
};

export default Sky;
