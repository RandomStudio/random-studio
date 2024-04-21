import { animated, useSpring } from '@react-spring/three';
import { RenderTexture } from '@react-three/drei';
import { useState } from 'react';
import MorphingGeometry from './MorphingGeometry/MorphingGeometry';
import InnerWorld from '../InnerWorld/InnerWorld';
import useWindowSize from '../../hooks/useWindowSize';

type OuterWorldProps = {
  hasOpenedUi: boolean;
  isExpanded: boolean;
};

const OuterWorld = ({ hasOpenedUi, isExpanded }: OuterWorldProps) => {
  const { width, height } = useWindowSize();
  const aspectRatio = width / height;

  const [hasRenderedWorld, setHasRenderedWorld] = useState(false);

  const [spring] = useSpring(
    {
      opacity: hasRenderedWorld ? 1 : 0,
    },
    [hasRenderedWorld],
  );

  return (
    <MorphingGeometry
      args={[6 * aspectRatio, 6, 3, 32, 32]}
      isCube={isExpanded}
      position={[0, 0, -4]}
    >
      <animated.meshBasicMaterial
        color="white"
        opacity={spring.opacity}
        transparent
      >
        <RenderTexture anisotropy={4} attach="map">
          <InnerWorld
            hasOpenedUi={hasOpenedUi}
            hasRenderedWorld={hasRenderedWorld}
            isExpanded={isExpanded}
            setHasRenderedWorld={setHasRenderedWorld}
          />
        </RenderTexture>
      </animated.meshBasicMaterial>
    </MorphingGeometry>
  );
};

export default OuterWorld;
