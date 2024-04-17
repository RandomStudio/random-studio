import { useEffect, useMemo, useRef, useState } from 'react';
import { Group, Mesh, MeshStandardMaterial, Plane, Vector3 } from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import Plants from '../../../../../models/Plants';
import useHomeAssistant, {
  ENTITY_ID_WHITELIST,
} from '../../../hooks/useHomeAssistant';
import useBoundingBox from '../../../hooks/useBoundingBox';

type CO2Plant = JSX.IntrinsicElements['group'] & {
  hasOpenedUi: boolean;
  roomId: (typeof ENTITY_ID_WHITELIST)[number];
  plant: 0 | 1 | 2 | 3;
};

const CO2Plant = ({ hasOpenedUi, roomId, plant, ...props }: CO2Plant) => {
  const gl = useThree(three => three.gl);

  const { value } = useHomeAssistant<number>(roomId);

  const [unhealthiness, setUnhealthiness] = useState(0);

  useEffect(() => {
    if (hasOpenedUi) {
      return;
    }

    if (value < 400) {
      setUnhealthiness(0);

      return;
    }

    if (value > 1000) {
      setUnhealthiness(1);

      return;
    }

    setUnhealthiness((value - 400) / (1000 - 400));
  }, [hasOpenedUi, value]);

  useFrame(({ clock }) => {
    if (!hasOpenedUi) {
      return;
    }

    setUnhealthiness(Math.sin(clock.elapsedTime));
  });

  const plantRef = useRef<Group>(null);

  const boundingBox = useBoundingBox(plantRef.current);

  const clippingPlane = useMemo(() => {
    if (!boundingBox) {
      return undefined;
    }

    const { max, min } = boundingBox;
    const height = max.y - min.y;

    const topDownPlane = new Plane(new Vector3(0, -1, 0), 0);
    const topDownClipPosition = max.y - unhealthiness * height; // Adjusted to clip top 20%
    topDownPlane.constant = topDownClipPosition;

    return topDownPlane;
  }, [boundingBox, unhealthiness]);

  useEffect(() => {
    if (!clippingPlane || !plantRef.current) {
      return;
    }

    const child = plantRef.current.children[0] as Mesh;
    const material = child.material as MeshStandardMaterial;
    material.clippingPlanes = [clippingPlane];
    material.clipShadows = true;

    gl.localClippingEnabled = true;
  }, [clippingPlane, gl]);

  return (
    <group {...props}>
      <Plants opacity={1} plant={plant} ref={plantRef} />

      <Plants opacity={0.2} plant={plant} />
    </group>
  );
};

export default CO2Plant;
