import { Box, OrbitControls, SoftShadows } from '@react-three/drei';
import { useRef } from 'react';
import { MeshBasicMaterial } from 'three';
import { useFrame } from '@react-three/fiber';
import Mainspace from '../../../models/Mainspace';
import Sky from './Sky/Sky';
import Plant from '../../../models/Plant';
import C02Plant from './C02Plant/C02Plant';

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

      <OrbitControls />

      <Mainspace
        isExpanded={isExpanded}
        position={[0, 1, 4]}
        rotation={[0, 0, 0]}
      />

      <C02Plant
        plant={0}
        position={[1, -1.2, -2.4]}
        roomId="sensor.knx_co2_main_space_2"
      />

      <C02Plant
        plant={1}
        position={[-1.5, -1.2, -0.1]}
        roomId="sensor.knx_co2_lab"
      />

      <C02Plant
        plant={2}
        position={[0.7, -1.4, 2]}
        roomId="sensor.knx_co2_kitchen"
      />

      <C02Plant
        plant={3}
        position={[-0.7, -1.2, 4.4]}
        roomId="sensor.knx_co2_upstairs"
      />
    </>
  );
};

export default InnerWorld;
