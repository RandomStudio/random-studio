import { useFrame } from '@react-three/fiber';
import { useCallback, useEffect, useRef, useState } from 'react';
import { MathUtils, Mesh, ShaderMaterial, Vector3, BackSide } from 'three';
import Sun from './Sun/Sun';
import useHomeAssistant from '../../../hooks/useHomeAssistant';
import { findStages, simulateSunPosition } from '../../../utils/skyUtils';
import Atmosphere from './Atmosphere/Atmosphere';

const sunPositionVector = new Vector3();
const centrePointVector = new Vector3(0, 0, -2);

export type SunState = {
  azimuth: number;
  elevation: number;
};

type SkyProps = {
  hasOpenedUi: boolean;
};

const Sky = ({ hasOpenedUi }: SkyProps) => {
  const latestState = useHomeAssistant<string, SunState>('sun.sun');

  const sunPositionRef = useRef(new Vector3());

  const sunStateRef = useRef<SunState>({
    azimuth: 0,
    elevation: 0,
  });

  const updateSunPosition = useCallback(({ azimuth, elevation }: SunState) => {
    const phi = MathUtils.degToRad(90 - elevation);
    const theta = MathUtils.degToRad(azimuth);

    const position = sunPositionVector.setFromSphericalCoords(10, phi, theta);
    position.add(centrePointVector);

    sunPositionRef.current = position;

    sunStateRef.current = {
      azimuth,
      elevation,
    };
  }, []);

  // By logging the elapsed time when we open the UI, we can ensure the sun starts on a white BG
  const initialUiClockTimeRef = useRef<number>(0);

  useEffect(() => {
    if (hasOpenedUi) {
      return undefined;
    }

    const { azimuth, elevation } = latestState?.attributes || {};

    updateSunPosition({
      azimuth,
      elevation,
    });

    return () => {
      initialUiClockTimeRef.current = 0;
    };
  }, [latestState, hasOpenedUi, updateSunPosition]);

  useFrame(({ clock }) => {
    const { elapsedTime } = clock;

    if (hasOpenedUi && initialUiClockTimeRef.current === 0) {
      initialUiClockTimeRef.current = elapsedTime;
    }

    const adjustedTime = elapsedTime - (initialUiClockTimeRef.current - 3);

    if (hasOpenedUi) {
      updateSunPosition(simulateSunPosition(adjustedTime));
    }
  });

  return (
    <>
      <Atmosphere sunStateRef={sunStateRef} />

      <Sun sunPositionRef={sunPositionRef} sunStateRef={sunStateRef} />
    </>
  );
};

export default Sky;
