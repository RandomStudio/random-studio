import React, { useRef, useEffect } from 'react';
import styles from './PreviewControls.module.scss';
import isTouchDevice from '../../../utils/isTouchDevice';
import useMousePosition from '../../../utils/hooks/useMousePosition';

const PreviewControls = ({ handleClick }: { handleClick: () => void }) => {
  const isMobile = isTouchDevice();

  const parentRef = useRef<HTMLDivElement>();
  const followTextRef = useRef<HTMLSpanElement>();

  const mousePosition = useMousePosition(parentRef.current);

  useEffect(() => {
    if (!followTextRef.current) {
      return;
    }

    followTextRef.current.style.transform = `translate(${mousePosition.x}px, ${mousePosition.y}px)`;
  }, [mousePosition]);

  return (
    <div className={styles.wrapper} onClick={handleClick} ref={parentRef}>
      <button className={styles.soundOnButton} type="button">
        {isMobile ? 'Show controls' : 'Sound on'}
      </button>

      {!isMobile && (
        <span className={styles.cursorFollowText} ref={followTextRef}>
          {'Show controls'}
        </span>
      )}
    </div>
  );
};

export default PreviewControls;
