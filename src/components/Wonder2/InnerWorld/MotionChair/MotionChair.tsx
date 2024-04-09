import { useSpring } from '@react-spring/three';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import { useRef } from 'react';
import useHomeAssistant, {
  ENTITY_ID_WHITELIST,
} from '../../hooks/useHomeAssistant';
import Chair from '../../../../models/Chair';

type MotionChairProps = Omit<JSX.IntrinsicElements['group'], 'id'> & {
  id: (typeof ENTITY_ID_WHITELIST)[number];
  isSpinning?: boolean;
};

const MotionChair = ({
  id,
  isSpinning = false,
  ...props
}: MotionChairProps) => {
  const { value } = useHomeAssistant<string>(id);

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

  // @ts-expect-error Passing spring
  return <Chair ref={chairRef} scale={spring.scale} {...props} />;
};

export default MotionChair;
