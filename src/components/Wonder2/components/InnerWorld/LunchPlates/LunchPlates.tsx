import Plate, { PlateInstances } from '../../../../../models/Plate';
import useHomeAssistant from '../../../hooks/useHomeAssistant';

const LunchPlates = () => {
  const { value } = useHomeAssistant<string>('input_boolean.is_lunch_time');

  return (
    <PlateInstances visible={value === 'on'}>
      <Plate position={[0, 0, -0.25]} />

      <Plate position={[1.3, 0, -0.25]} />

      <Plate position={[1.3, 0, -0.9]} />

      <Plate position={[0.4, 0, -0.9]} />
    </PlateInstances>
  );
};

export default LunchPlates;
