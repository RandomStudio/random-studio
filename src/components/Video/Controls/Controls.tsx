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
  const [shareLinkText, setShareLinkText] = useState('Share');
  const [isShareComponent, setIsShareComponent] = useState(false);

  const hasNavigatorShare = !!navigator.share;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  const handleShareVia = async () => {
    navigator.share({
      title: 'Video',
      text: 'Video',
      url: window.location.href,
    });
  };

  const handlePlayToggle = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const handleShareToggle = useCallback(() => {
    // If navigator.share is no available, copy url and show "copied" text
    if (!hasNavigatorShare) {
      setShareLinkText('Copied!');
      navigator.clipboard.writeText(window.location.href);

      return;
    }

    setIsShareComponent(true);
  }, [hasNavigatorShare]);

  useEffect(() => {
    const changePlayState = isNowPlaying => setIsPlaying(isNowPlaying);

    videoRef.current?.addEventListener('play', () => changePlayState(true));

    videoRef.current?.addEventListener('pause', () => changePlayState(false));
  }, [videoRef]);

  useEffect(() => {
    if (isPlaying) {
      videoRef.current
        .play()
        .catch(e =>
          console.warn('Unable to autoplay without user interaction', e),
        );
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
    [styles.isSimpleControls]: !hasExtendedControls,
    [styles.isHoveringProgress]: isHoveringProgress,
  });

  return (
    <div className={wrapperClasses}>
      <div className={styles.showControls}>{'Show Controls'}</div>

      {isShareComponent && (
        <>
          <button
            className={styles.share}
            onClick={handleCopyLink}
            type="button"
          >
            {'Copy Link'}
          </button>

          <button
            className={styles.share}
            onClick={handleShareVia}
            type="button"
          >
            {'Share Via'}
          </button>
        </>
      )}

      <button
        className={styles.playToggle}
        onClick={handlePlayToggle}
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

      <button
        className={styles.share}
        onClick={handleShareToggle}
        type="button"
      >
        {shareLinkText}
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
