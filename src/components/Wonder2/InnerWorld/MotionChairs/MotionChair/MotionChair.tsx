import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import { useRef } from 'react';
import { animated, useSpring } from '@react-spring/three';
import useHomeAssistant, {
  ENTITY_ID_WHITELIST,
} from '../../../hooks/useHomeAssistant';
import ChairLegs from '../../../../../models/ChairLegs';
import ChairSeat from '../../../../../models/ChairSeat';

type MotionChairProps = Omit<JSX.IntrinsicElements['group'], 'id'> & {
  id: (typeof ENTITY_ID_WHITELIST)[number];
  isSpinning?: boolean;
};

const MotionChair = ({
  id,
  isSpinning = false,
  ...props
}: MotionChairProps) => {
  // const { value } = useHomeAssistant<string>(id);
  const value = 'on';
  const chairRef = useRef<Group>(null);

  const spring = useSpring({
    scale: value === 'on' ? 1 : 0,
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
