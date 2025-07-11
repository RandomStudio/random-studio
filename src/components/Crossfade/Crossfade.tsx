import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import styles from './Crossfade.module.css';

type CrossfadeProps = {
  children: ReactElement;
  duration?: number;
};

const Crossfade = ({ children, duration = 250 }: CrossfadeProps) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [visibleChildren, setVisibleChildren] = useState(children);

  const transition = useCallback(
    (nextChildren: ReactElement) => {
      setIsTransitioning(true);

      window.setTimeout(() => {
        setVisibleChildren(nextChildren);
        setIsTransitioning(false);
      }, duration);
    },
    [duration],
  );

  useEffect(() => {
    if (children?.key !== visibleChildren?.key) {
      transition(children);
    }
  }, [children, transition, visibleChildren]);

  return (
    <div
      className={`${styles.base} ${isTransitioning ? '' : styles.visible}`}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {visibleChildren}
    </div>
  );
};

export default Crossfade;
