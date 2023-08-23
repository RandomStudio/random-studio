import classNames from 'classnames';
import { MutableRefObject, useCallback, useEffect, useState } from 'react';
import styles from './Controls.module.css';
import useSharedUnmutedVideoState from './useSharedUnmutedVideoState';
import Progress from './Progress/Progress';

type ControlsProps = {
  className?: string;
  isAutoplaying: boolean;
  hasExtendedControls?: boolean;
  videoRef: MutableRefObject<HTMLVideoElement>;
};

const Controls = ({
  className = undefined,
  isAutoplaying = false,
  hasExtendedControls = false,
  videoRef,
}: ControlsProps) => {
  /*
  // Handle play pause
  */
  const [isPlaying, setIsPlaying] = useState(isAutoplaying);

  const handlePlayToggle = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  useEffect(() => {
    const changePlayState = isNowPlaying => setIsPlaying(isNowPlaying);

    videoRef.current?.addEventListener('play', () => changePlayState(true));

    videoRef.current?.addEventListener('pause', () => changePlayState(false));
  }, [videoRef]);

  useEffect(() => {
    if (isPlaying) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }, [isPlaying, videoRef]);

  /*
  // Handle mute
  */
  const [isMuted, toggleIsMuted] = useSharedUnmutedVideoState(
    videoRef.current?.src ?? 'unknown',
  );

  useEffect(() => {
    if (!videoRef.current) {
      return;
    }

    // eslint-disable-next-line no-param-reassign
    videoRef.current.muted = isMuted;
  }, [isMuted, videoRef]);

  const [isHoveringProgress, setIsHoveringProgress] = useState(false);

  /*
  // Render controls
  */
  const wrapperClasses = classNames(styles.wrapper, className, {
    [styles.isLightControls]: !hasExtendedControls,
    [styles.isHoveringProgress]: isHoveringProgress,
  });

  return (
    <div className={wrapperClasses}>
      <button
        className={styles.playToggle}
        onClick={handlePlayToggle}
        type="button"
      >
        {isPlaying ? 'Pause' : 'Play'}
      </button>

      <Progress
        className={styles.progress}
        onHover={setIsHoveringProgress}
        videoRef={videoRef}
      />

      <button
        className={styles.muteToggle}
        onClick={toggleIsMuted}
        type="button"
      >
        {isMuted ? 'Sound On' : 'Sound Off'}
      </button>

      <button className={styles.share} type="button">
        {'Share'}
      </button>

      <a
        download
        href={videoRef.current?.dataset.downloadSrc}
        rel="noreferrer"
        target="_blank"
      >
        {'Download'}
      </a>
    </div>
  );
};

export default Controls;
