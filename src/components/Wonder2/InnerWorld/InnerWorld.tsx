import { Box, OrbitControls, SoftShadows } from '@react-three/drei';
import { useRef } from 'react';
import { MeshBasicMaterial } from 'three';
import { useFrame } from '@react-three/fiber';
import Mainspace from '../../../models/Mainspace';
import Sky from './Sky/Sky';

const InnerWorld = ({ isExpanded }: { isExpanded: boolean }) => {
  const materialRef = useRef<MeshBasicMaterial>(null);

  useFrame(({ clock }) => {
    if (!materialRef.current) {
      return;
    }

    const time = clock.getElapsedTime();
    materialRef.current.color.r = Math.sin(time);
  });

  return (
    <>
      <Box
        args={[1, 1, 1]}
        position={isExpanded ? [0, 0.5, 0] : [0, -0.75, 1]}
        visible={false}
      />

      <Sky />

      <Mainspace
        isExpanded={isExpanded}
        position={[0, 1, 4]}
        rotation={[0, 0, 0]}
      />
    </>
  );
};

export default InnerWorld;
