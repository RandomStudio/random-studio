import {
  Box,
  MeshPortalMaterial,
  PerspectiveCamera,
  PortalMaterialType,
  RenderCubeTexture,
  RenderTexture,
  Sphere,
} from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { BoxGeometry, BufferGeometry, SphereGeometry } from 'three';
import Mainspace from '../../../models/Mainspace';
import SunLight from './Sunlight';

let angle = Math.PI / 2;
let direction = 1;
const radius = 5;

const World = ({ isExpanded }: { isExpanded: boolean }) => {
  const camera = useThree(state => state.camera);
  const boxRef = useRef<typeof Box>(null);

  const [hasLookedAtBox, setHasLookedAtBox] = useState(false);

  useFrame(() => {
    if (!boxRef.current) {
      return;
    }

    camera.position.x =
      boxRef.current.position.x + radius * Math.cos(angle) * -1;

    camera.position.y = boxRef.current.position.y;

    camera.position.z =
      boxRef.current.position.z + radius * Math.sin(angle) * -1;

    if (!isExpanded) {
      if (!hasLookedAtBox) {
        camera.rotation.x = 0;
        camera.rotation.y = 0;
        camera.rotation.z = 0;
        angle = Math.PI / 2;
        setHasLookedAtBox(true);
      }

      camera.position.z = 6;
      camera.rotation.z += 0.005;
      camera.rotation.x = -2;
      camera.rotation.y = -6;

      return;
    }

    setHasLookedAtBox(false);

    camera.lookAt(boxRef.current.position);

    if (angle > Math.PI / 1.1) {
      direction = -1;
    } else if (angle < 0.2) {
      direction = 1;
    }

    angle += 0.001 * direction;
  });

  return (
    <>
      <Box
        args={[1, 1, 1]}
        position={isExpanded ? [0, 0.5, 0] : [0, -0.75, 1]}
        ref={boxRef}
        visible={false}
      />

      <SunLight />

      <Mainspace position={[0, 1, 4]} rotation={[0, 0, 0]} />
    </>
  );
};

export default World;
