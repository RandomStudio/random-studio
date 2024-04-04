import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { BoxGeometry, Vector3, PerspectiveCamera, Mesh } from 'three';
import { Box } from '@react-three/drei';
import { calculateScaleToFitViewport, getMorphedGeometry } from './morphUtils';

export type SimplifiedBox = {
  geometry: BoxGeometry;
  position: Vector3;
  scale: Vector3;
};

const MorphingGeometry = ({ isCube, ...props }) => {
  const ref = useRef<SimplifiedBox>();
  const { camera, invalidate } = useThree();
  const lastMorphRef = useRef<number>(0);
  const morphRef = useRef<number>(0);

  useFrame(() => {
    if (!ref.current) {
      return;
    }

    const direction = isCube ? -1 : 1;
    const speed = 0.04;

    morphRef.current += speed * direction;
    morphRef.current = Math.min(1, Math.max(0, morphRef.current));

    // Morph the box to a sphere
    const adjustedGeometry = getMorphedGeometry(ref.current, morphRef.current);
    ref.current.geometry = adjustedGeometry;

    if (lastMorphRef.current !== morphRef.current) {
      const scale = calculateScaleToFitViewport(
        camera as PerspectiveCamera,
        ref.current as unknown as Mesh,
      );

      ref.current.scale.set(scale.x, scale.y, scale.z); // Apply new scale without direct mutation

      invalidate();
    }

    lastMorphRef.current = morphRef.current;
  });

  return <Box {...props} ref={ref} />;
};

export default MorphingGeometry;
