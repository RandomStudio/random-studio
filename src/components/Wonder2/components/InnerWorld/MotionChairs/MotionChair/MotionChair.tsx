import { animated, useSpring } from '@react-spring/three';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import { useEffect, useRef } from 'react';
import useHomeAssistant, {
  ENTITY_ID_WHITELIST,
} from '../../../../hooks/useHomeAssistant';
import ChairLegs from '../../../../../../models/ChairLegs';
import ChairSeat from '../../../../../../models/ChairSeat';

type MotionChairProps = Omit<JSX.IntrinsicElements['group'], 'id'> & {
  hasOpenedUi: boolean;
  id: (typeof ENTITY_ID_WHITELIST)[number];
  isSpinning?: boolean;
};

const MotionChair = ({
  hasOpenedUi,
  id,
  isSpinning = false,
  ...props
}: MotionChairProps) => {
  const { value } = useHomeAssistant<string>(id);

  const chairRef = useRef<Group>(null);

  const [spring] = useSpring(
    () => ({
      scale: 0,
    }),
    [],
  );

  useEffect(() => {
    if (hasOpenedUi) {
      return;
    }

    spring.scale.start(value === 'on' ? 1 : 0);
  }, [hasOpenedUi, spring.scale, value]);

  useEffect(() => {
    if (!hasOpenedUi) {
      return undefined;
    }

    const interval = setInterval(() => {
      spring.scale.set(spring.scale.get() === 1 ? 0 : 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  useFrame(() => {
    if (!isSpinning || !chairRef.current || value !== 'on') {
      return;
    }

    chairRef.current.rotation.y += 0.01;
  });

  return (
    <animated.group scale={spring.scale} {...props}>
      <ChairLegs />

      <group ref={chairRef}>
        <ChairSeat />
      </group>
    </animated.group>
  );
};

export default MotionChair;
