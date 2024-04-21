import {
  Dispatch,
  RefObject,
  SetStateAction,
  Suspense,
  useEffect,
  useState,
} from 'react';
import { Canvas } from '@react-three/fiber';
import classNames from 'classnames';
// import { Perf } from 'r3f-perf';
import { Float } from '@react-three/drei';
import styles from './Wonder2.module.css';
import OuterWorld from './components/OuterWorld/OuterWorld';
import R3FErrorBoundary from './components/R3FErrorBoundary/R3FErrorBoundary';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import Button from './ui/Button';
import Overlay from './ui/Overlay';

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
  const [hasOpenedUi, setHasOpenedUi] = useState(false);

  const canvasClassNames = classNames(styles.canvas, {
    [styles.isFocused]: isWonderFocused,
  });

  const handleCanvasClick = () => {
    setIsWonderFocused(isCurrentlyFocused => !isCurrentlyFocused);
    //    setIsWonderFocused(true);
  };

  useEffect(() => {
    if (isWonderFocused) {
      return;
    }

    setHasOpenedUi(false);
  }, [isWonderFocused]);

  useEffect(() => {
    const wonderScale = 200 / window.innerWidth;

    containerRef.current?.style.setProperty('--wonder-scale', `${wonderScale}`);
  }, [containerRef]);

  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    if (isWonderFocused) {
      setIsIdle(false);

      return undefined;
    }

    const idleTimeout = setTimeout(() => {
      setIsIdle(true);
    }, 15000);

    return () => {
      clearTimeout(idleTimeout);
    };
  }, [isWonderFocused]);

  const frameLoop = isWonderFocused || !isIdle ? 'always' : 'demand';

  return (
    <Suspense fallback={null}>
      <div className={canvasClassNames}>
        <ErrorBoundary>
          <Canvas frameloop={frameLoop} onClick={handleCanvasClick}>
            <R3FErrorBoundary>
              <Float
                floatIntensity={isWonderFocused ? 0 : 1}
                floatingRange={isWonderFocused ? [0, 0] : [-0.5, 0.5]}
                rotationIntensity={0}
                speed={isWonderFocused ? 10 : 1.5}
              >
                <OuterWorld
                  hasOpenedUi={hasOpenedUi}
                  isExpanded={isWonderFocused}
                />
              </Float>
            </R3FErrorBoundary>
          </Canvas>
        </ErrorBoundary>

        {isWonderFocused && (
          <Button hasOpenedUi={hasOpenedUi} setHasOpenedUi={setHasOpenedUi} />
        )}

        <Overlay hasOpenedUi={hasOpenedUi} />
      </div>
    </Suspense>
  );
};

export default Wonder2;
