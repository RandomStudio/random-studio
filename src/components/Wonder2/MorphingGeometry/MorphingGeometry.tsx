import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  SphereGeometry,
  BoxGeometry,
  MeshBasicMaterial,
  Vector3,
  MathUtils,
  Float32BufferAttribute,
  Box3,
  PerspectiveCamera,
} from 'three';
import { Box } from '@react-three/drei';

function morphBoxToSphere(geometry: BoxGeometry, morphValue: number): void {
  const sphereRadius = Math.sqrt(5);
  const positions = geometry.attributes.position as Float32BufferAttribute;

  if (!geometry.attributes.originalPositions) {
    geometry.setAttribute('originalPositions', positions.clone());
  }

  const { originalPositions } = geometry.attributes;

  const newPosition = [];
  const blankVector = new Vector3();

  for (let i = 0; i < positions.count; i++) {
    const originalX = originalPositions.getX(i);
    const originalY = originalPositions.getY(i);
    const originalZ = originalPositions.getZ(i);

    const original = new Vector3(originalX, originalY, originalZ);

    const target = new Vector3(originalX, originalY, originalZ);
    target.normalize().multiplyScalar(sphereRadius);

    const result = blankVector
      .clone()
      .lerpVectors(original, target, morphValue);

    newPosition.push(result.x, result.y, result.z);
  }

  // Update the geometry with the new positions
  geometry.setAttribute('position', new Float32BufferAttribute(newPosition, 3));

  geometry.computeVertexNormals(); // Recompute normals for correct lighting
}

function moveBoxToFillCamera(box: Box3, camera: PerspectiveCamera): void {
  // Calculate the distance from the camera to the box's center

  const distanceToCenter = box
    .getBoundingSphere()
    .center.distanceTo(camera.position);

  // Calculate the size of the box based on its dimensions
  const size = new Vector3();
  box.getSize(size);

  // Calculate the half FOV in radians
  const halfFOV = MathUtils.degToRad(camera.fov) / 2;

  // Calculate the height and width of the box at the distance of the camera
  const heightAtDistance = 2 * Math.tan(halfFOV) * distanceToCenter;
  const widthAtDistance = heightAtDistance * camera.aspect;

  // Calculate the scale needed to fill the camera's view
  const scaleX = widthAtDistance / size.x;
  const scaleY = heightAtDistance / size.y;
  const scaleZ = widthAtDistance / size.z;

  // Set the scale of the box
  box.scale.set(scaleX, scaleY, scaleZ);

  // Calculate the new position of the box to center it in the camera's view
  const newPosition = new Vector3();
  camera.getWorldDirection(newPosition);
  newPosition.multiplyScalar(distanceToCenter);
  newPosition.add(camera.position);

  // Set the position of the box
  box.position.copy(newPosition);
}

const MorphingGeometry = ({ isCube, ...props }) => {
  const ref = useRef<{ geometry: BoxGeometry }>();
  const { invalidate } = useThree();
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
    morphBoxToSphere(ref.current?.geometry, morphRef.current);

    if (lastMorphRef.current !== morphRef.current) {
      invalidate();
    }

    lastMorphRef.current = morphRef.current;
  });

  return <Box {...props} ref={ref} />;
};

export default MorphingGeometry;
