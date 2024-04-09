import { Dispatch, RefObject, SetStateAction, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import classNames from 'classnames';
import { Perf } from 'r3f-perf';
import { Float } from '@react-three/drei';
import styles from './Wonder2.module.css';
import OuterWorld from './OuterWorld/OuterWorld';

type Wonder2Props = {
  containerRef: RefObject<HTMLDivElement>;
  isWonderFocused: boolean;
  setIsWonderFocused: Dispatch<SetStateAction<boolean>>;
};

const Wonder2 = ({
  containerRef,
  isWonderFocused,
  setIsWonderFocused,
}: Wonder2Props) => {
  const canvasClassNames = classNames(styles.canvas, {
    [styles.isFocused]: isWonderFocused,
  });

  const handleCanvasClick = () => {
    //    setIsWonderFocused(isCurrentlyFocused => !isCurrentlyFocused);
    setIsWonderFocused(true);
  };

  useEffect(() => {
    const wonderScale = 200 / window.innerWidth;

    containerRef.current?.style.setProperty('--wonder-scale', `${wonderScale}`);
  }, [containerRef]);

  return (
    <div className={canvasClassNames}>
      <Canvas onClick={handleCanvasClick}>
        {isWonderFocused && <Perf deepAnalyze overClock />}

        <Float
          floatIntensity={isWonderFocused ? 0 : 1}
          floatingRange={isWonderFocused ? [0, 0] : [-0.5, 0.5]}
          rotationIntensity={0}
          speed={isWonderFocused ? 10 : 1.5}
        >
          <OuterWorld isExpanded={isWonderFocused} />
        </Float>
      </Canvas>
    </div>
  );
};

export default Wonder2;
