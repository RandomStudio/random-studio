import Plant from '../../../../models/Plant';

const C02Plant = props => {
  return (
    <group {...props}>
      <Plant />

      <Plant isWireFrame />
    </group>
  );
};

export default C02Plant;
