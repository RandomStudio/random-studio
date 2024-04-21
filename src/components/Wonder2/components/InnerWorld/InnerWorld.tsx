import { Box } from '@react-three/drei';
import { Suspense } from 'react';
import Mainspace from '../../../../models/Mainspace';
import Sky from './Sky/Sky';
import CO2Plant from './CO2Plant/CO2Plant';
import LunchPlates from './LunchPlates/LunchPlates';
import MotionChairs from './MotionChairs/MotionChairs';
import Camera from './Camera/Camera';
import Desk, { DeskInstances } from '../../../../models/Desk';
import Loader from './Loader/Loader';

type InnerWorldProps = {
  hasRenderedWorld: boolean;
  hasOpenedUi: boolean;
  isExpanded: boolean;
  setHasRenderedWorld: (hasRenderedWorld: boolean) => void;
};

const InnerWorld = ({
  hasRenderedWorld,
  hasOpenedUi,
  isExpanded,
  setHasRenderedWorld,
}: InnerWorldProps) => {
  const handleRenderScene = () => {
    if (hasRenderedWorld) {
      return;
    }

    setHasRenderedWorld(true);
  };

  return (
    <Suspense fallback={<Loader onLoad={handleRenderScene} />}>
      <Box
        args={[1, 1, 1]}
        position={isExpanded ? [0, 0.5, 0] : [0, -0.75, 1]}
        visible={false}
      />

      <Sky hasOpenedUi={hasOpenedUi} />

      <Camera hasOpenedUi={hasOpenedUi} isExpanded={isExpanded} />

      <Mainspace
        onAfterRender={handleRenderScene}
        onBeforeRender={handleRenderScene}
        onLo
        position={[0, 1, 4]}
        rotation={[0, 0, 0]}
      />

      <CO2Plant
        hasOpenedUi={hasOpenedUi}
        plant={0}
        position={[1, -1.2, -2.4]}
        roomId="sensor.knx_co2_main_space_2"
      />

      <CO2Plant
        hasOpenedUi={hasOpenedUi}
        plant={1}
        position={[-1.5, -1.2, -0.1]}
        roomId="sensor.knx_co2_lab"
      />

      <CO2Plant
        hasOpenedUi={hasOpenedUi}
        plant={2}
        position={[0.7, -1.4, 2]}
        roomId="sensor.knx_co2_kitchen"
      />

      <CO2Plant
        hasOpenedUi={hasOpenedUi}
        plant={3}
        position={[-0.7, -1.2, 4.4]}
        roomId="sensor.knx_co2_upstairs"
      />

      <CO2Plant
        hasOpenedUi={hasOpenedUi}
        plant={1}
        position={[1, -1.2, 6.5]}
        roomId="sensor.knx_co2_meeting_view"
        rotation={[0, Math.PI, 0]}
        scale={1.2}
      />

      <CO2Plant
        hasOpenedUi={hasOpenedUi}
        plant={3}
        position={[5.8, -1.2, 9.8]}
        roomId="sensor.knx_co2_meeting_red"
        rotation={[0, Math.PI / -1.1, 0]}
      />

      <CO2Plant
        hasOpenedUi={hasOpenedUi}
        plant={3}
        position={[-5.6, -1.2, 10.2]}
        roomId="sensor.knx_co2_meeting_stairs"
        rotation={[0, Math.PI / -2.1, 0]}
      />

      <DeskInstances position={[0, -0.75, 3]}>
        <Desk position={[4.5, 0, 0]} />

        <Desk position={[-5, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
      </DeskInstances>

      <MotionChairs hasOpenedUi={hasOpenedUi} />

      <LunchPlates />
    </Suspense>
  );
};

export default InnerWorld;
