import { RenderTexture } from '@react-three/drei';
import MorphingGeometry from './MorphingGeometry/MorphingGeometry';
import InnerWorld from '../InnerWorld/InnerWorld';
import useWindowSize from '../hooks/useWindowSize';

type OuterWorldProps = {
  isExpanded: boolean;
};

const OuterWorld = ({ isExpanded }: OuterWorldProps) => {
  const { width, height } = useWindowSize();
  const aspectRatio = width / height;

  return (
    <MorphingGeometry
      args={[6 * aspectRatio, 6, 3, 32, 32]}
      isCube={isExpanded}
      position={[0, 0, -4]}
    >
      <meshBasicMaterial color="white">
        <RenderTexture anisotropy={4} attach="map">
          <ambientLight intensity={0.1} />

          <InnerWorld isExpanded={isExpanded} />
        </RenderTexture>
      </meshBasicMaterial>
    </MorphingGeometry>
  );
};

export default OuterWorld;
