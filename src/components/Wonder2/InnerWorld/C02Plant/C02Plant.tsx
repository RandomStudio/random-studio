import { useEffect, useMemo, useRef, useState } from 'react';
import { Box3, Group, Mesh, MeshStandardMaterial, Plane, Vector3 } from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import Plants from '../../../../models/Plants';
import useHomeAssistant from '../../hooks/useHomeAssistant';

type C02Plant = JSX.IntrinsicElements['group'] & {
  roomId: string;
  plant: 0 | 1 | 2 | 3;
};

const bbox = new Box3();

const C02Plant = ({ roomId, plant, ...props }: C02Plant) => {
  const plantRef = useRef<Mesh>(null);

  const gl = useThree(three => three.gl);

  const { value } = useHomeAssistant<number>(roomId);

  const unhealthiness = useMemo(() => {
    if (value < 400) {
      return 0;
    }

    if (value > 1000) {
      return 1;
    }

    return (value - 400) / (1000 - 400);
  }, [value]);

  const [clippingPlane, setClippingPlane] = useState<Plane>(
    new Plane(new Vector3(0, -1, 0), 0),
  );

  useFrame(() => {
    if (!clippingPlane || !plantRef.current) {
      return;
    }

    bbox.setFromObject(plantRef.current);
    const height = bbox.max.y - bbox.min.y;
    const clipPosition = bbox.max.y - unhealthiness * height; // Adjust to clip from the top down

    clippingPlane.constant = clipPosition;
    setClippingPlane(clippingPlane);
  });

  useEffect(() => {
    if (!clippingPlane || !plantRef.current) {
      return;
    }

    const material = plantRef.current.material as MeshStandardMaterial;
    material.clippingPlanes = [clippingPlane];
    material.clipShadows = true;

    gl.localClippingEnabled = true;
  }, [clippingPlane, gl]);

  return (
    <group {...props}>
      <Plants plant={plant} ref={plantRef} />
    </group>
  );
};

export default C02Plant;
