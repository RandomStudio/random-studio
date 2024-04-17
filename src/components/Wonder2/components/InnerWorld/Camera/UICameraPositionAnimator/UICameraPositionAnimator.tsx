import { useSpring } from '@react-spring/web';
import { Sphere } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { RefObject, useMemo, useRef, useState } from 'react';
import {
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Quaternion,
  SphereGeometry,
  Vector3,
} from 'three';
import { lerpCamera, quaternionFromLookAt } from '../cameraUtils';

const sphereCentrePoint = new Vector3(-7, 0, 6);
const sphereRadius = 17.5;

type UICameraPositionAnimatorProps = {
  cameraRef: RefObject<PerspectiveCamera>;
  hasOpenedUi: boolean;
};

const UICameraPositionAnimator = ({
  cameraRef,
  hasOpenedUi,
}: UICameraPositionAnimatorProps) => {
  const size = useThree(state => state.size);
  const sphereRef = useRef<Mesh<SphereGeometry, MeshBasicMaterial>>(null);

  const openUiCameraPostion = useMemo(() => {
    const camera = cameraRef.current;

    if (!camera) {
      return new Vector3();
    }

    const center = sphereCentrePoint;
    const theta = Math.PI / 2.1; // 45 degrees
    const phi = Math.PI / 1.4; // 45 degrees

    const aspect = size.width / size.height;
    const vFov = (camera.fov * Math.PI) / 180; // Vertical FOV in radians
    const hFov = 2 * Math.atan(Math.tan(vFov / 2) * aspect); // Horizontal FOV in radians

    // Calculate distance to fit the sphere horizontally within the view
    const distance = sphereRadius / Math.sin(hFov / 2); // Adjusting based on horizontal FOV

    // Calculate camera position using spherical coordinates
    const offsetX = distance * Math.sin(phi) * Math.cos(theta);
    const offsetY = distance * Math.sin(phi) * Math.sin(theta);
    const offsetZ = distance * Math.cos(phi);

    // Set the new camera position
    return new Vector3(
      center.x + offsetX,
      center.y + offsetY,
      center.z + offsetZ,
    );
  }, [cameraRef, size.width, size.height]);

  const [startPosition, setStartPosition] = useState<Vector3>();
  const [startRotation, setStartRotation] = useState<Quaternion>();

  const uiSpring = useSpring({
    delta: hasOpenedUi ? 1 : 0,
    onStart: () => {
      if (!cameraRef.current || startPosition) {
        return;
      }

      setStartPosition(
        new Vector3(
          cameraRef.current.position.x,
          cameraRef.current.position.y,
          cameraRef.current.position.z,
        ),
      );

      setStartRotation(
        new Quaternion().setFromEuler(cameraRef.current.rotation),
      );
    },
  });

  useFrame(() => {
    if (!cameraRef.current) {
      return;
    }

    const delta = uiSpring.delta.get();

    if (delta === 0 && !hasOpenedUi) {
      if (startPosition) {
        setStartPosition(undefined);
        setStartRotation(undefined);
      }

      return;
    }

    if (!startPosition || !startRotation) {
      return;
    }

    if (delta === 1 && hasOpenedUi) {
      return;
    }

    const finalPosition = openUiCameraPostion;

    const finalRotation = quaternionFromLookAt(
      finalPosition,
      sphereCentrePoint,
    );

    const { position, rotation } = lerpCamera(
      startPosition,
      startRotation,
      finalPosition,
      finalRotation,
      delta,
    );

    cameraRef.current.position.set(position.x, position.y, position.z);
    cameraRef.current.rotation.setFromQuaternion(rotation);
  });

  return (
    <Sphere
      args={[sphereRadius, 8, 8]}
      position={sphereCentrePoint}
      ref={sphereRef}
      visible={false}
    />
  );
};

export default UICameraPositionAnimator;
