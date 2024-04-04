import { Box } from '@react-three/drei';
import { useRef } from 'react';
import { Color, Material } from 'three';
import { useFrame } from '@react-three/fiber';
import Mainspace from '../../../models/Mainspace';
import Sunlight from './Sunlight/Sunlight';

const InnerWorld = ({ isExpanded }: { isExpanded: boolean }) => {
  const boxRef = useRef<typeof Box>(null);

  const materialRef = useRef<Material>();

  useFrame(({ clock }) => {
    if (!materialRef) {
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
        ref={boxRef}
        visible={false}
      />

      <Box args={[50, 50, 1]} position={[0, 0, 30]} rotation={[0, 0, 0]}>
        <meshBasicMaterial color="yellow" ref={materialRef} />
      </Box>

      <Sunlight />

      <Mainspace position={[0, 1, 4]} rotation={[0, 0, 0]} />
    </>
  );
};

export default InnerWorld;
