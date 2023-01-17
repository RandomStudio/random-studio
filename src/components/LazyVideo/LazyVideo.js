/* eslint-disable jsx-a11y/media-has-caption */
import React, {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  useMemo,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import styles from './LazyVideo.module.scss';
import { videoPropType } from '../../propTypes';
import useWindowSize from '../../utils/hooks/useWindowSize';

const LazyVideo = React.forwardRef(
  (
    {
      alt,
      className,
      hasControls,
      video,
      isAutoplaying,
      isLooping,
      isMuted,
      onPlayStateChange,
      width,
    },
    parentRef,
  ) => {
    const videoRef = useRef();
    const [hasJs, setHasJs] = useState(false);

    const [isIntersected, setIsIntersected] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const handlePlay = useCallback(async () => {
      try {
        await videoRef.current.play();
        onPlayStateChange(true);
      } catch (err) {
        console.warn(err);
        onPlayStateChange(false);
      } finally {
        setIsLoaded(true);
      }
    }, [onPlayStateChange]);

    const handlePause = useCallback(() => {
      videoRef.current.pause();
      onPlayStateChange(false);
    }, [onPlayStateChange]);

    useImperativeHandle(
      parentRef,
      () => ({
        play: handlePlay,
        pause: handlePause,
      }),
      [handlePause, handlePlay],
    );

    useEffect(() => {
      // Reference for cleanup
      const ref = videoRef.current;
      setHasJs(true);

      const handleAutoplay = async () => {
        if (!isAutoplaying) {
          return;
        }

        handlePlay();
      };

      if (!ref) {
        return undefined;
      }

      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setIsIntersected(true);
              handleAutoplay();
              observer.disconnect();
            }
          });
        },
        {
          rootMargin: '8%',
        },
      );

      observer.observe(ref);

      return () => {
        if (ref) {
          observer.unobserve(ref);
        }

        observer.disconnect();
      };
    }, [videoRef, isAutoplaying, handlePlay]);

    const { dpr, width: windowWidth } = useWindowSize();

    const sourceElements = useMemo(() => {
      if (!video) {
        return null;
      }

      const videoWidth = (windowWidth / 100) * width * dpr;

      const sizes = video.sources.map(source =>
        parseInt(source.replace('p', '')),
      );

      const transformedSizes = sizes.map(source =>
        Math.abs(source - videoWidth),
      );

      const orderedSizes = [...transformedSizes].sort((a, b) => a - b);

      const indexOfClosest = transformedSizes.findIndex(
        value => value === orderedSizes[0],
      );

      const sourceUrl =
        video.sources[indexOfClosest] === video.originalSource
          ? 'original'
          : `play_${video.sources[indexOfClosest]}.mp4`;

      return <source src={`${video.baseUrl}/${sourceUrl}`} type="video/mp4" />;
    }, [dpr, video, width, windowWidth]);

    if (!video) {
      return null;
    }

    const { blur } = video;

    const videoElement = (
      <>
        <video
          className={styles.jsVideo}
          loop={isLooping}
          muted={isMuted}
          playsInline
          ref={videoRef}
        >
          {isIntersected ? sourceElements : null}
        </video>

        <noscript>
          <video
            controls={hasControls}
            loop={isLooping}
            muted={isMuted}
            playsInline
          >
            {sourceElements}
          </video>
        </noscript>
      </>
    );
    /* eslint-enable jsx-a11y/media-has-caption */

    // Prevents autoplay conflicting
    return (
      <div
        className={`${styles.frame} ${className} ${isLoaded ? styles.isLoaded : ''
          }
        ${hasJs ? styles.hasJs : ''}`}
        style={{
          aspectRatio: `${video.width} / ${video.height}`,
        }}
      >
        <img
          alt={alt}
          aria-hidden
          className={styles.placeholder}
          src={`data:image/jpeg;base64,${blur}`}
        />

        {videoElement}
      </div>
    );
  },
);

LazyVideo.propTypes = {
  alt: PropTypes.string,
  className: PropTypes.string,
  hasControls: PropTypes.bool,
  isAutoplaying: PropTypes.bool,
  isLooping: PropTypes.bool,
  isMuted: PropTypes.bool,
  onPlayStateChange: PropTypes.func,
  video: videoPropType.isRequired,
  width: PropTypes.number,
};

LazyVideo.defaultProps = {
  alt: null,
  className: '',
  hasControls: false,
  isAutoplaying: true,
  isLooping: true,
  isMuted: true,
  onPlayStateChange: () => null,
  width: 100,
};

LazyVideo.displayName = 'LazyVideo';

export default LazyVideo;
