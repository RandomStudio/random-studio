import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Crossfade.module.scss';

const Crossfade = ({ children, duration }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [visibleChildren, setVisibleChildren] = useState(children);

  const transition = useCallback(
    nextChildren => {
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

Crossfade.propTypes = {
  children: PropTypes.node,
  duration: PropTypes.number,
};

Crossfade.defaultProps = {
  duration: 250,
};

export default Crossfade;
