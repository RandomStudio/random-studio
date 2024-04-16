import { Matrix4, Quaternion, Vector3 } from 'three';

export const quaternionFromLookAt = (
  position: Vector3,
  target: Vector3,
  up = new Vector3(0, 1, 0),
) => {
  // Create a matrix that looks at the target from the position
  const lookAtMatrix = new Matrix4();
  lookAtMatrix.lookAt(position, target, up);

  // Extract a quaternion from the matrix
  const quaternion = new Quaternion();
  quaternion.setFromRotationMatrix(lookAtMatrix);

  return quaternion;
};

export const slerpRotation = (
  currentRotation: Quaternion,
  targetRotation: Quaternion,
  alpha: number,
) => {
  let rotation;

  if (currentRotation.dot(targetRotation) < 0) {
    rotation = new Quaternion(
      -targetRotation.x,
      -targetRotation.y,
      -targetRotation.z,
      -targetRotation.w,
    );
  } else {
    rotation = targetRotation.clone();
  }

  return currentRotation.clone().slerp(rotation, alpha);
};

export const lerpPosition = (
  currentPosition: Vector3,
  targetPosition: Vector3,
  alpha: number,
) => {
  return currentPosition.clone().lerp(targetPosition, alpha);
};

export const lerpCamera = (
  cameraPosition: Vector3,
  cameraRotation: Quaternion,
  targetPosition: Vector3,
  targetRotation: Quaternion,
  alpha: number,
) => {
  const newPosition = lerpPosition(cameraPosition, targetPosition, alpha);

  const newRotation = slerpRotation(cameraRotation, targetRotation, alpha);

  return {
    position: newPosition,
    rotation: newRotation,
  };
};
