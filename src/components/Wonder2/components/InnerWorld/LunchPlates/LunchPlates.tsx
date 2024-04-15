import Plate, { PlateInstances } from '../../../../../models/Plate';
import useHomeAssistant from '../../../hooks/useHomeAssistant';

const LunchPlates = () => {
  const { value } = useHomeAssistant<string>('input_boolean.is_lunch_time');

  return (
    <PlateInstances visible={value === 'on'}>
      <Plate />

      <Plate position={[1.3, 0, 0]} />

      <Plate position={[1.3, 0, -0.7]} />

      <Plate position={[0.4, 0, -0.7]} />
    </PlateInstances>
  );
};

export default LunchPlates;
