import { animated, useSpring } from '@react-spring/three';
import { RenderTexture } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import { Mesh } from 'three';
import { useFrame } from '@react-three/fiber';
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
      z: 0,
      opacity: hasRenderedWorld ? 1 : 0,
    },
    [isExpanded, hasRenderedWorld],
  );

  useEffect(() => {
    return () => {
      setHasRenderedWorld(false);
    };
  }, []);

  const meshRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) {
      return;
    }

    if (!isExpanded) {
      spring.z.set(clock.getDelta() + spring.z.get());
    } else {
      spring.z.start(0);
    }

    meshRef.current.rotation.z = (spring.z.get() * -Math.PI) / 2;
  });

  return (
    <MorphingGeometry
      args={[6 * aspectRatio, 6, 3, 32, 32]}
      isCube={isExpanded}
      position={[0, 0, -4]}
      ref={meshRef}
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
