import React, {
  MutableRefObject,
  forwardRef,
  useCallback,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import styles from './VideoContent.module.scss';
import LazyLoad from '../../LazyLoad/LazyLoad';
import Controls from '../Controls/Controls';
import { VideoData } from '../../../types/types';
import useHlsVideo from './useHlsVideo';

export type VideoContentProps = {
  hasControls: boolean;
  isAutoplaying: boolean;
  isLooping: boolean;
  onClick: () => void;
  onReady: () => void;
  video: VideoData;
};

const VideoContent = forwardRef<HTMLVideoElement, VideoContentProps>(
  (
    {
      isAutoplaying,
      hasControls,
      isLooping,
      onClick,
      onReady,
      video: { baseUrl, blur, height, hls, width },
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
    }, []);

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

    const frameClasses = classNames(styles.frame, {
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
            src={`data:image/jpeg;base64,${blur}`}
          />

          {isMounted && (
            <>
              <video
                autoPlay
                className={styles.video}
                controls={false}
                data-download-src={`${baseUrl}/original`}
                loop={isLooping}
                muted
                onClick={onClick}
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

VideoContent.displayName = 'VideoContent';

export default VideoContent;
