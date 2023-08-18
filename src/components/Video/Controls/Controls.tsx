import classNames from 'classnames';
import { MutableRefObject, useCallback, useEffect, useState } from 'react';
import styles from './Controls.module.css';
import useSharedUnmutedVideoState from './useSharedUnmutedVideoState';

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

  console.log('isMuted', isMuted);
  console.log(videoRef.current?.src);

  useEffect(() => {
    if (!videoRef.current) {
      return;
    }

    videoRef.current.muted = isMuted;
  }, [isMuted, videoRef]);

  /*
  // Render controls
  */
  const wrapperClasses = classNames(styles.wrapper, className, {
    [styles.isLightControls]: !hasExtendedControls,
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

      <button
        className={styles.muteToggle}
        onClick={toggleIsMuted}
        type="button"
      >
        {isMuted ? 'Sound On' : 'Sound Off'}
      </button>

      <button type="button">{'Share'}</button>

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
