import React from 'react';
import Link from 'next/link';
import styles from './PreviewControls.module.scss';
import useMousePosition from '../../../utils/hooks/useMousePosition';

const PreviewControls = ({ videoUrl }: { videoUrl: string }) => {
  const mousePosition = useMousePosition();

  const cursorFollowPositionStyles = {
    transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
  };

  return (
    <div className={styles.wrapper}>
      <Link className={styles.soundOnButton} href={videoUrl}>
        Sound on
      </Link>

      <span style={cursorFollowPositionStyles}>Show controls</span>
    </div>
  );
};

export default PreviewControls;
