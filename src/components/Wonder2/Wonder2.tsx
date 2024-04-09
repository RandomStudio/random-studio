import { Dispatch, RefObject, SetStateAction, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import classNames from 'classnames';
import { Perf } from 'r3f-perf';
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

    // containerRef.current?.style.setProperty('--wonder-scale', `${wonderScale}`);
  }, [containerRef]);

  return (
    <div className={canvasClassNames}>
      <Canvas frameloop="demand" onClick={handleCanvasClick}>
        <Perf deepAnalyze overClock />

        <OuterWorld isExpanded={isWonderFocused} />
      </Canvas>
    </div>
  );
};

export default Wonder2;
