import { Sphere } from '@react-three/drei';
import { ChairLegsInstances } from '../../../../../models/ChairLegs';
import { ChairSeatInstances } from '../../../../../models/ChairSeat';
import MotionChair from './MotionChair/MotionChair';

const MotionChairs = () => {
  return (
    <ChairLegsInstances>
      <ChairSeatInstances>
        <MotionChair
          id="binary_sensor.knx_motion_entrance"
          position={[4.5, 0, 2]}
          rotation={[0, Math.PI / -1.4, 0]}
        />

        <MotionChair
          id="binary_sensor.knx_motion_lab"
          position={[3.7, 0, 4.2]}
          rotation={[0, Math.PI, 0]}
        />

        <MotionChair
          id="binary_sensor.knx_motion_main_area"
          position={[5, 0, 4.2]}
          rotation={[0, Math.PI / -1.1, 0]}
        />

        <MotionChair
          id="binary_sensor.knx_motion_meeting_view"
          isSpinning
          position={[6.2, 0, 3]}
          rotation={[0, Math.PI / -4, 0]}
        />

        <MotionChair
          id="binary_sensor.knx_motion_meeting_stairs"
          position={[2.8, 0, 3]}
          rotation={[0, Math.PI / 2.3, 0]}
        />

        {
          //
        }

        <MotionChair
          id="binary_sensor.knx_motion_arena"
          position={[-6.1, 0, 2.4]}
          rotation={[0, Math.PI / 2, 0]}
        />

        <MotionChair
          id="binary_sensor.knx_motion_kitchen"
          position={[-3.9, 0, 3.7]}
          rotation={[0, Math.PI / -2, 0]}
        />

        <MotionChair
          id="binary_sensor.knx_motion_meeting_red"
          position={[-6.1, 0, 3.7]}
          rotation={[0, Math.PI / 1.3, 0]}
        />

        <MotionChair
          id="binary_sensor.knx_motion_silent"
          position={[-4.6, 0, 1.5]}
          rotation={[0, Math.PI / -12, 0]}
        />
      </ChairSeatInstances>
    </ChairLegsInstances>
  );
};

export default MotionChairs;
