import { Sky as DreiSky } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { MathUtils, Mesh, ShaderMaterial, Vector3 } from 'three';
import Sun from './Sun/Sun';
import useHomeAssistant from '../../../hooks/useHomeAssistant';
import { findStages, simulateSunPosition } from '../../../utils/skyUtils';
import { lerp } from '../../../utils/animationUtils';

const sunPositionVector = new Vector3();
const centrePointVector = new Vector3(0, 0, 5);

type SkyProps = {
  hasOpenedUi: boolean;
};

const Sky = ({ hasOpenedUi }: SkyProps) => {
  const latestState = useHomeAssistant<
    string,
    { elevation: number; azimuth: number }
  >('sun.sun');

  const skyRef = useRef<Mesh & { material: ShaderMaterial }>(null);

  const [sunPosition, setSunPosition] = useState(new Vector3());

  const calculationSunPosition = useCallback(
    ({ azimuth, elevation }: { azimuth: number; elevation: number }) => {
      const phi = MathUtils.degToRad(90 - elevation);
      const theta = MathUtils.degToRad(azimuth);

      const position = sunPositionVector.setFromSphericalCoords(10, phi, theta);
      position.add(centrePointVector);

      return position;
    },
    [],
  );

  const { azimuth, elevation } = latestState?.attributes || {};

  // By logging the elapsed time when we open the UI, we can ensure the sun starts on a white BG
  const initialUiClockTimeRef = useRef<number>(0);

  useEffect(() => {
    if (hasOpenedUi) {
      return undefined;
    }

    const position = calculationSunPosition({
      azimuth,
      elevation,
    });

    setSunPosition(position);

    return () => {
      initialUiClockTimeRef.current = 0;
    };
  }, [calculationSunPosition, azimuth, elevation, hasOpenedUi]);

  useFrame(({ clock }) => {
    // Adjust sky properties for a smooth transition
    if (!skyRef.current || !elevation) {
      return;
    }

    const { elapsedTime } = clock;

    if (hasOpenedUi && initialUiClockTimeRef.current === 0) {
      initialUiClockTimeRef.current = elapsedTime;
    }

    const adjustedTime = elapsedTime - (initialUiClockTimeRef.current - 3);

    const position = hasOpenedUi
      ? calculationSunPosition(simulateSunPosition(adjustedTime))
      : sunPosition;

    skyRef.current.material.uniforms.sunPosition.value.set(...position);

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
