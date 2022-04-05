import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './LazyVideo.module.scss';

const LazyVideo = React.forwardRef(
  (
    { alt, className, hasControls, video, isAutoplaying, isLooping, isMuted },
    parentRef,
  ) => {
    const localRef = useRef();
    const videoRef = parentRef ?? localRef;
    const [hasJs, setHasJs] = useState(false);
    const [intersected, setIntersected] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
      // Reference for cleanup
      const ref = videoRef.current;
      setHasJs(true);

      const handlePlayer = () => {
        if (isAutoplaying) {
          ref.play().catch(() => null);
        }
      };

      if (!ref) {
        return undefined;
      }

      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setIntersected(true);
              handlePlayer();
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
    }, [videoRef, isAutoplaying]);

    if (!video) {
      return null;
    }

    const { sources, blur, height, width } = video;

    const blurThumbnail = `data:image/jpeg;base64,${blur}`;

    /* eslint-disable jsx-a11y/media-has-caption */
    const sourceElements = (
      <>
        {/* <source src={sources?.hls} type="application/x-mpegurl" /> */}

        <source src={sources?.mp4} type="video/mp4" />
      </>
    );

    const videoElement = (
      <>
        <video
          className={styles.jsVideo}
          loop={isLooping}
          muted={isMuted}
          onPlaying={() => setIsLoaded(true)}
          playsInline
          ref={videoRef}
        >
          {intersected ? sourceElements : null}
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
        className={`${styles.frame} ${className} ${
          isLoaded ? styles.isLoaded : ''
        }
        ${hasJs ? styles.hasJs : ''}`}
        style={{
          aspectRatio: `${width} / ${height}`,
        }}
      >
        <img
          alt={alt}
          aria-hidden
          className={styles.placeholder}
          src={blurThumbnail}
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
  isMuted: PropTypes.bool.isRequired,
  video: PropTypes.shape({
    blur: PropTypes.string.isRequired,
    sources: PropTypes.shape({
      mp4: PropTypes.string.isRequired,
    }).isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  }).isRequired,
};

LazyVideo.defaultProps = {
  alt: null,
  className: '',
  hasControls: false,
  isAutoplaying: true,
  isLooping: true,
};

LazyVideo.displayName = 'LazyVideo';

export default LazyVideo;
