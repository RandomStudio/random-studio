import React, { ReactNode, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { BoxGeometry, Vector3, PerspectiveCamera, Mesh } from 'three';
import { Args, Box, ShapeProps } from '@react-three/drei';
import { calculateScaleToFitViewport, getMorphedGeometry } from './morphUtils';

type Box = Omit<ShapeProps<typeof BoxGeometry>, 'position'>;

type MorphingGeometryProps = {
  args: Args<typeof BoxGeometry>;
  children: ReactNode;
  isCube: boolean;
  position: number[] | Vector3;
} & Box;

const MorphingGeometry = ({
  args,
  children,
  isCube,
  ...props
}: MorphingGeometryProps) => {
  const ref = useRef<Mesh>();
  const { camera, invalidate } = useThree();
  const lastMorphRef = useRef<number>(0);
  const morphRef = useRef<number>(isCube ? 0 : 1);

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

  return (
    /* eslint-disable */
    // @ts-expect-error Weird ref typing
    <Box args={args} {...props} ref={ref}>
      {/* eslint-enable */}
      {children}
    </Box>
  );
};

export default MorphingGeometry;
