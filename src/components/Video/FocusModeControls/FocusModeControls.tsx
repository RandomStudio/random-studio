import React, { useRef, useEffect, useCallback } from 'react';
import styles from './FocusModeControls.module.scss';
import isTouchDevice from '../../../utils/isTouchDevice';

const FocusModeControls = () => {
  const isTouch = isTouchDevice();

  const parentRef = useRef<HTMLDivElement>();
  const followTextRef = useRef<HTMLSpanElement>();

  const updateMousePosition = useCallback((ev: MouseEvent) => {
    if (!followTextRef.current || !parentRef.current) {
      return;
    }

    const offsetTop = parentRef.current.getBoundingClientRect().top;
    const mouseX = ev.clientX;
    const mouseY = ev.clientY - offsetTop;

    followTextRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', e => updateMousePosition(e));

    return () => {
      window.removeEventListener('mousemove', e => updateMousePosition(e));
    };
  }, [updateMousePosition]);

  return (
    <div className={styles.wrapper} ref={parentRef}>
      <span className={styles.soundOnText}>
        {isTouch ? 'Show controls' : 'Sound on'}
      </span>

      {!isTouch && (
        <span className={styles.cursorFollowText} ref={followTextRef}>
          {'Show controls'}
        </span>
      )}
    </div>
  );
};

export default FocusModeControls;
