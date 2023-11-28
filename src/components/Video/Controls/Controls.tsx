import classNames from 'classnames';
import { MutableRefObject, useCallback, useEffect, useState } from 'react';
import styles from './Controls.module.css';
import useSharedUnmutedVideoState from './useSharedUnmutedVideoState';
import Progress from './Progress/Progress';
import ShareComponent from '../ShareComponent/ShareComponent';

type ControlsProps = {
  className?: string;
  isAutoplaying: boolean;
  onClick?: () => void;
  hasExtendedControls?: boolean;
  videoRef: MutableRefObject<HTMLVideoElement | null>;
};

const Controls = ({
  className = undefined,
  isAutoplaying = false,
  hasExtendedControls = false,
  onClick = null,
  videoRef,
}: ControlsProps) => {
  /*
  // Handle play pause
  */
  const [isPlaying, setIsPlaying] = useState(isAutoplaying);
  const [shareLinkText, setShareLinkText] = useState('Share');
  const [showShareDialog, setShowShareDialog] = useState(false);

  const hasNavigatorShare = !!navigator.share;

  const handlePlayToggle = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const handleShareToggle = useCallback(() => {
    if (!hasNavigatorShare) {
      setShareLinkText('Copied!');
      navigator.clipboard.writeText(window.location.href);

      setTimeout(() => {
        setShareLinkText('Share');
      }, 5000);

      return;
    }

    setShowShareDialog(true);
  }, [hasNavigatorShare]);

  useEffect(() => {
    const changePlayState = (isNowPlaying: boolean) =>
      setIsPlaying(isNowPlaying);

    videoRef.current?.addEventListener('play', () => changePlayState(true));

    videoRef.current?.addEventListener('pause', () => changePlayState(false));
  }, [videoRef]);

  useEffect(() => {
    if (!videoRef.current) {
      return;
    }

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
      <div className={styles.showControls} onClick={onClick}>
        {'Show Controls'}
      </div>

      {showShareDialog ? (
        <ShareComponent setShowShareDialog={setShowShareDialog} />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default Controls;
