import { Box, OrbitControls } from '@react-three/drei';
import Mainspace from '../../../../models/Mainspace';
import Sky from './Sky/Sky';
import CO2Plant from './CO2Plant/CO2Plant';
import LunchPlates from './LunchPlates/LunchPlates';
import MotionChairs from './MotionChairs/MotionChairs';
import Camera from './Camera/Camera';
import Desk, { DeskInstances } from '../../../../models/Desk';

type InnerWorldProps = {
  hasOpenedUi: boolean;
  isExpanded: boolean;
};

const InnerWorld = ({ hasOpenedUi, isExpanded }: InnerWorldProps) => {
  return (
    <>
      <Box
        args={[1, 1, 1]}
        position={isExpanded ? [0, 0.5, 0] : [0, -0.75, 1]}
        visible={false}
      />

      <Sky />

      <Camera hasOpenedUi={hasOpenedUi} isExpanded={isExpanded} />

      <Mainspace position={[0, 1, 4]} rotation={[0, 0, 0]} />

      <CO2Plant
        plant={0}
        position={[1, -1.2, -2.4]}
        roomId="sensor.knx_co2_main_space_2"
      />

      <CO2Plant
        plant={1}
        position={[-1.5, -1.2, -0.1]}
        roomId="sensor.knx_co2_lab"
      />

      <CO2Plant
        plant={2}
        position={[0.7, -1.4, 2]}
        roomId="sensor.knx_co2_kitchen"
      />

      <CO2Plant
        plant={3}
        position={[-0.7, -1.2, 4.4]}
        roomId="sensor.knx_co2_upstairs"
      />

      {
        //
      }

      <CO2Plant
        plant={1}
        position={[1, -1.2, 6.5]}
        roomId="sensor.knx_co2_meeting_view"
        rotation={[0, Math.PI, 0]}
        scale={1.2}
      />

      <CO2Plant
        plant={3}
        position={[5.8, -1.2, 9.8]}
        roomId="sensor.knx_co2_meeting_red"
        rotation={[0, Math.PI / -1.1, 0]}
      />

      <CO2Plant
        plant={3}
        position={[-5.6, -1.2, 10.2]}
        roomId="sensor.knx_co2_meeting_stairs"
        rotation={[0, Math.PI / -2.1, 0]}
      />

      <DeskInstances position={[0, -0.75, 3]}>
        <Desk position={[4.5, 0, 0]} />

        <Desk position={[-5, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
      </DeskInstances>

      <MotionChairs />

      <LunchPlates />
    </>
  );
};

export default InnerWorld;
