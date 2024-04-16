// Default props doesn't work with forwardRef
/* eslint-disable react/require-default-props */
import React, {
  MutableRefObject,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import styles from './Video.module.css';
import LazyLoad from '../LazyLoad/LazyLoad';
import Controls from './Controls/Controls';
import { VideoData } from '../../types/types';
import useHlsVideo from './useHlsVideo';

export type VideoProps = {
  className?: string;
  hasAudio?: boolean;
  hasControls?: boolean;
  isAutoplaying?: boolean;
  isLooping?: boolean;
  isMuted?: boolean;
  onClick?: (video: HTMLVideoElement) => void;
  onMount?: () => void;
  onReady?: () => void;
  video: VideoData;
};

// Extend HTMLVideoElement to include properties that are not part of the standard
// Audiotracks is still not part of the standard, despite being present for years
export type ExtendedHTMLVideoElement = HTMLVideoElement & {
  togglePlay: () => void;
  mozHasAudio?: boolean;
  webkitAudioDecodedByteCount?: number;
  audioTracks?: MediaStreamTrack[];
};

const Video = forwardRef<ExtendedHTMLVideoElement, VideoProps>(
  (
    {
      className = undefined,
      hasAudio = true,
      hasControls = false,
      isAutoplaying = true,
      isLooping = true,
      isMuted = true,
      onClick = () => null,
      onMount = () => null,
      onReady = () => null,
      video,
    },
    ref,
  ) => {
    const { downloadUrl, blur, guid, height, hls, width } = video;
    const localRef = useRef<ExtendedHTMLVideoElement>();

    const videoRef =
      (ref as unknown as MutableRefObject<ExtendedHTMLVideoElement>) ||
      localRef;

    const [isMounted, setIsMounted] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);

    const handleMount = useCallback(() => {
      setIsMounted(true);
      onMount?.();
    }, [onMount]);

    const handleVideoReady = useCallback(() => {
      setHasLoaded(true);
      onReady?.();
    }, [onReady]);

    const aspectRatioStyle = { aspectRatio: `${width} / ${height}` };

    const [isPlaying, setIsPlaying] = useState(isAutoplaying);

    const handleChangePlayState = useCallback(
      async (isNowPlaying: boolean) => {
        if (!isNowPlaying) {
          videoRef.current?.pause();
          setIsPlaying(false);

          return;
        }

        try {
          await videoRef.current?.play();
          setIsPlaying(true);
        } catch (e) {
          console.warn('Unable to autoplay without user interaction', e);
        }
      },
      [videoRef],
    );

    useEffect(() => {
      if (!isMounted) {
        return;
      }

      videoRef.current.togglePlay = () => {
        const isVideoElNowPlaying = !videoRef.current?.paused;
        handleChangePlayState(!isVideoElNowPlaying);
      };
    }, [handleChangePlayState, isMounted, isPlaying, videoRef]);

    useHlsVideo({
      isAutoplaying,
      isMounted,
      onPlay: () => handleChangePlayState(true),
      onReady: handleVideoReady,
      videoRef,
      src: hls,
    });

    const handleClick = useCallback(
      () => onClick?.(videoRef.current),
      [onClick, videoRef],
    );

    const frameClasses = classNames(styles.frame, className, {
      [styles.isLoaded]: hasLoaded,
      [styles.hasSizeData]: width && height,
    });

    return (
      <LazyLoad onIntersect={handleMount}>
        <div className={frameClasses} style={aspectRatioStyle}>
          <img
            alt="video placeholder"
            aria-hidden
            className={styles.placeholder}
            src={`data:image/jpeg;base64,${blur?.thumbnail}`}
          />

          {isMounted && (
            <>
              <video
                autoPlay
                className={styles.video}
                controls={false}
                data-download-src={downloadUrl}
                id={guid}
                loop={isLooping}
                muted={isMuted}
                onClick={handleClick}
                onContextMenu={e => e.preventDefault()}
                playsInline
                ref={videoRef}
                src={hls}
                style={aspectRatioStyle}
              />

              {hasControls && hasLoaded && (
                <Controls
                  hasAudio={hasAudio}
                  isAutoplaying={isAutoplaying}
                  onClick={handleClick}
                  videoRef={videoRef}
                />
              )}
            </>
          )}
        </div>
      </LazyLoad>
    );
  },
);

Video.displayName = 'Video';

export default Video;
