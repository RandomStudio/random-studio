import { Box, OrbitControls } from '@react-three/drei';
import Mainspace from '../../../models/Mainspace';
import Sky from './Sky/Sky';
import CO2Plant from './CO2Plant/CO2Plant';
import MotionChair from './MotionChair/MotionChair';

const InnerWorld = ({ isExpanded }: { isExpanded: boolean }) => {
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

      <MotionChair
        id="binary_sensor.knx_motion_meeting_view"
        isSpinning
        position={[6, 0, 3]}
        rotation={[0, Math.PI / -4, 0]}
      />

      <MotionChair
        id="binary_sensor.knx_motion_entrance"
        position={[5, 0, 2.2]}
        rotation={[0, -Math.PI, 0]}
      />

      <MotionChair
        id="binary_sensor.knx_motion_lab"
        position={[5, 0, 4.2]}
        rotation={[0, 0.9, 0]}
      />

      <MotionChair
        id="binary_sensor.knx_motion_arena"
        position={[4, 0, 2.2]}
        rotation={[0, 0, 0]}
      />

      <MotionChair
        id="binary_sensor.knx_motion_meeting_stairs"
        position={[2.8, 0, 3]}
        rotation={[0, Math.PI / -4, 0]}
      />

      <MotionChair
        id="binary_sensor.knx_motion_main_area"
        position={[5, 0, 4.2]}
        rotation={[0, 0.9, 0]}
      />
    </>
  );
};

export default InnerWorld;
