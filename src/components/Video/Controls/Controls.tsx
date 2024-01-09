import {
  MutableRefObject,
  RefObject,
  useCallback,
  useEffect,
  useState,
} from 'react';
import classNames from 'classnames';
import styles from './Controls.module.css';
import type { ExtendedHTMLVideoElement } from '../Video';
import Progress from './Progress/Progress';
import ShareComponent from '../ShareComponent/ShareComponent';
import useSharedUnmutedVideoState from './useSharedUnmutedVideoState';

type ControlsProps = {
  className?: string;
  hasAudio: boolean;
  isAutoplaying: boolean;
  hasAudioControls?: boolean;
  hasExtendedControls?: boolean;
  onClick?: () => void;
  videoRef:
  | MutableRefObject<ExtendedHTMLVideoElement>
  | RefObject<ExtendedHTMLVideoElement>;
};

const Controls = ({
  className = undefined,
  hasAudio,
  hasAudioControls = true,
  isAutoplaying = false,
  hasExtendedControls = false,
  onClick = () => null,
  videoRef,
}: ControlsProps) => {
  const [isPlaying, setIsPlaying] = useState(isAutoplaying);

  const [hasCopiedShareLink, setHasCopiedShareLink] = useState(false);
  const [isShowingShareOptions, setIsShowingShareOptions] = useState(false);

  const handlePlayToggle = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const handleCopyLink = useCallback(() => {
    setHasCopiedShareLink(true);
    navigator.clipboard.writeText(window.location.href);

    setTimeout(() => {
      setHasCopiedShareLink(false);
    }, 5000);
  }, []);

  const handleShareToggle = useCallback(() => {
    const hasNavigatorShare = !!navigator.share;

    if (!hasNavigatorShare) {
      handleCopyLink();

      return;
    }

    setIsShowingShareOptions(true);
  }, [handleCopyLink]);

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
  const wrapperClasses = classNames(styles.wrapper, 'controls', className, {
    [styles.isAudioControlsHidden]: !hasAudio || !hasAudioControls,
    [styles.isSimpleControls]: !hasExtendedControls,
    [styles.isHoveringProgress]: isHoveringProgress,
  });

  return (
    <div className={wrapperClasses}>
      <div className={styles.showControls} onClick={onClick}>
        {'Show Controls'}
      </div>

      {isShowingShareOptions ? (
        <ShareComponent
          hasCopiedShareLink={hasCopiedShareLink}
          onCopyLink={handleCopyLink}
          setIsShowingShareOptions={setIsShowingShareOptions}
        />
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
            {hasCopiedShareLink ? 'Copied!' : 'Share'}
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
