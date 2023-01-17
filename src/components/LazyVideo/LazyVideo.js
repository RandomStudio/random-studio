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
import Hls from 'hls.js';
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
    const [hasFailed, setHasFailed] = useState(false);

    const handleInitializeHls = useCallback(() => {
      if (
        videoRef.current.canPlayType('application/vnd.apple.mpegurl') ||
        !Hls.isSupported()
      ) {
        return;
      }

      const hls = new Hls({
        startLevel: window.innerWidth > 1280 ? 4 : 2,
      });

      hls.loadSource(videoRef.current.children[0].src);
      hls.attachMedia(videoRef.current);
    }, []);

    const handlePlay = useCallback(async () => {
      try {
        handleInitializeHls();
        await videoRef.current.play();
        onPlayStateChange(true);
      } catch (err) {
        console.warn(err);
        setHasFailed(true);
        onPlayStateChange(false);
      } finally {
        setIsLoaded(true);
      }
    }, [handleInitializeHls, onPlayStateChange]);

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

    const getMp4FallbackSrc = useCallback(
      sources => {
        if (!sources) {
          return null;
        }

        const videoWidth = (windowWidth / 100) * width * dpr;

        const sizes = sources
          .map(source => parseInt(source.replace('p', '')))
          .filter(size => size < 721);

        const transformedSizes = sizes.map(source =>
          Math.abs(source - videoWidth),
        );

        const orderedSizes = [...transformedSizes].sort((a, b) => a - b);

        const indexOfClosest = transformedSizes.findIndex(
          value => value === orderedSizes[0],
        );

        return `play_${sources[indexOfClosest]}.mp4`;
      },
      [dpr, width, windowWidth],
    );

    const sourceElements = useMemo(() => {
      if (!video) {
        return null;
      }

      const { sources, hls } = video;
      const mp4Fallback = getMp4FallbackSrc(sources);

      return (
        <>
          <source src={hls} type="vnd.apple.mpegURL" />

          <source src={`${video.baseUrl}/${mp4Fallback}`} type="video/mp4" />
        </>
      );
    }, [getMp4FallbackSrc, video]);

    if (!video) {
      return null;
    }

    const { blur, fallback } = video;

    const videoElement = (
      <>
        <video
          className={styles.jsVideo}
          loop={isLooping}
          muted={isMuted}
          playsInline
          poster={fallback}
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
          '--aspectRatio': `${video.width} / ${video.height}`,
        }}
      >
        <img
          alt={alt}
          aria-hidden
          className={styles.placeholder}
          src={`data:image/jpeg;base64,${blur}`}
        />

        {videoElement}

        {hasFailed && (
          <img alt={alt} className={styles.placeholder} src={fallback} />
        )}
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
