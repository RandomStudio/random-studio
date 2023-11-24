import { MutableRefObject, RefObject, useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './Controls.module.css';
import type { ExtendedHTMLVideoElement } from '../Video';
import Progress from './Progress/Progress';
import useSharedUnmutedVideoState from './useSharedUnmutedVideoState';

type ControlsProps = {
  className?: string;
  hasAudio: boolean;
  isAutoplaying: boolean;
  hasExtendedControls?: boolean;
  onClick?: () => void;
  videoRef:
    | MutableRefObject<ExtendedHTMLVideoElement>
    | RefObject<ExtendedHTMLVideoElement>;
};

const Controls = ({
  className = undefined,
  hasAudio,
  isAutoplaying = false,
  hasExtendedControls = false,
  onClick = () => null,
  videoRef,
}: ControlsProps) => {
  const [isPlaying, setIsPlaying] = useState(isAutoplaying);

  useEffect(() => {
    videoRef.current?.addEventListener('play', () => setIsPlaying(true));

    videoRef.current?.addEventListener('pause', () => setIsPlaying(false));
  }, [videoRef]);

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
    [styles.hasNoAudio]: !hasAudio,
    [styles.isSimpleControls]: !hasExtendedControls,
    [styles.isHoveringProgress]: isHoveringProgress,
  });

  return (
    <div className={wrapperClasses}>
      <div className={styles.showControls} onClick={onClick}>
        {'Show Controls'}
      </div>

      <button
        className={styles.playToggle}
        onClick={() => videoRef.current?.togglePlay()}
        type="button"
      >
        {isPlaying ? 'Pause' : 'Play'}
      </button>

      {hasExtendedControls && (
        <Progress
          className={styles.progress}
          onHover={setIsHoveringProgress}
          videoRef={videoRef}
        />
      )}

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
        className={styles.download}
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
