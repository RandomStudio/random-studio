import {
  Float32BufferAttribute,
  Mesh,
  Vector3,
  PerspectiveCamera,
  Camera,
} from 'three';

// Morphvalue is a value between 0 and 1 that determines how much the box should morph between a box (0) and a sphere (1)
export const getMorphedGeometry = (shape: Mesh, morphValue: number) => {
  const sphereRadius = Math.sqrt(5);
  const geometry = shape.geometry.clone();
  const positions = geometry.attributes.position as Float32BufferAttribute;

  if (!geometry.attributes.originalPositions) {
    geometry.setAttribute('originalPositions', positions.clone());
  }

  const { originalPositions } = geometry.attributes;

  const blankVector = new Vector3();

  const newPosition = Array.from({ length: positions.count }, (_, i) => {
    const originalX = originalPositions.getX(i);
    const originalY = originalPositions.getY(i);
    const originalZ = originalPositions.getZ(i);

    const original = blankVector.clone().set(originalX, originalY, originalZ);

    const target = blankVector
      .clone()
      .set(originalX, originalY, originalZ)
      .normalize()
      .multiplyScalar(sphereRadius);

    const result = blankVector
      .clone()
      .lerpVectors(original, target, morphValue);

    return [result.x, result.y, result.z];
  }).flat();

  // Update the geometry with the new positions
  geometry.setAttribute('position', new Float32BufferAttribute(newPosition, 3));

  geometry.computeVertexNormals(); // Recompute normals for correct lighting

  return geometry;
};

// Calculates visible dimensions based on FOV, aspect ratio, and distance
function calculateVisibleDimensions(
  fov: number,
  aspectRatio: number,
  distance: number,
): { width: number; height: number } {
  const height = 2 * Math.tan((fov * 0.5 * Math.PI) / 180) * distance;
  const width = height * aspectRatio;

  return {
    width,
    height,
  };
}

const scaleVector = new Vector3();

// Returns a new scale for the box to fit within given container dimensions
function getBoxNewScale(
  box: Mesh,
  containerWidth: number,
  containerHeight: number,
) {
  const boxGeometry = box.geometry;

  // @ts-expect-error Parameters does exist
  scaleVector.setX(containerWidth / boxGeometry.parameters.width);

  // @ts-expect-error Parameters does exist
  scaleVector.setY(containerHeight / boxGeometry.parameters.height);

  scaleVector.setZ(box.scale.z); // Assuming no change needed for Z scale

  return scaleVector.clone();
}

function calculateDistance(camera: Camera, box: Mesh) {
  const cameraPosition = new Vector3().copy(camera.position); // Copy camera position
  const boxPosition = new Vector3().copy(box.position); // Copy box position
  const distanceVector = cameraPosition.sub(boxPosition); // Subtract box position from camera position

  return distanceVector.length(); // Return the length of the vector as the distance
}

export const calculateScaleToFitViewport = (
  camera: PerspectiveCamera,
  mesh: Mesh,
) => {
  const distance = calculateDistance(camera, mesh);

  const { width, height } = calculateVisibleDimensions(
    camera.fov,
    camera.aspect,
    distance,
  );

  const scale = getBoxNewScale(mesh, width, height);

  return scale;
};
