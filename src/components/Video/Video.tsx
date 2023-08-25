import React, {
  MutableRefObject,
  forwardRef,
  useCallback,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import styles from './Video.module.scss';
import LazyLoad from '../LazyLoad/LazyLoad';
import Controls from './Controls/Controls';
import { VideoData } from '../../types/types';
import useHlsVideo from './useHlsVideo';

export type VideoProps = {
  className?: string;
  hasControls?: boolean;
  isAutoplaying?: boolean;
  isLooping?: boolean;
  onClick?: (video: HTMLVideoElement) => void;
  onMount?: () => void;
  onReady?: () => void;
  video: VideoData;
};

const Video = forwardRef<HTMLVideoElement, VideoProps>(
  (
    {
      className,
      isAutoplaying,
      hasControls,
      isLooping,
      onClick,
      onReady,
      onMount,
      video: { baseUrl, blur, guid, height, hls, width },
    },
    ref,
  ) => {
    const localRef = useRef<HTMLVideoElement>();

    const videoRef =
      (ref as unknown as MutableRefObject<HTMLVideoElement>) || localRef;

    const [isMounted, setIsMounted] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);

    const handleMount = useCallback(() => {
      setIsMounted(true);
      onMount?.();
    }, [onMount]);

    const handleVideoReady = useCallback(() => {
      setHasLoaded(true);
    }, []);

    const aspectRatioStyle = { aspectRatio: `${width} / ${height}` };

    useHlsVideo({
      isAutoplaying,
      isMounted,
      onReady,
      videoRef,
      src: hls,
    });

    const handleClick = useCallback(() => {
      onClick?.(videoRef.current);
    }, [onClick, videoRef]);

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
            src={`data:image/jpeg;base64,${blur.thumbnail}`}
          />

          {isMounted && (
            <>
              <video
                autoPlay
                className={styles.video}
                controls={false}
                data-download-src={`${baseUrl}/original`}
                id={guid}
                loop={isLooping}
                muted
                onClick={handleClick}
                onPlaying={handleVideoReady}
                playsInline
                ref={videoRef}
                src=""
                style={aspectRatioStyle}
              />

              {hasControls && hasLoaded && (
                <Controls isAutoplaying={isAutoplaying} videoRef={videoRef} />
              )}
            </>
          )}
        </div>
      </LazyLoad>
    );
  },
);

Video.displayName = 'Video';

Video.defaultProps = {
  className: null,
  hasControls: false,
  isAutoplaying: true,
  isLooping: true,
  onClick: () => null,
  onMount: () => null,
  onReady: () => null,
};

export default Video;
