import React, { useState, useMemo, useEffect, useRef } from 'react';
import styles from './LazyVideo.module.scss';

const LazyVideo = React.forwardRef(
  (
    { alt, className, hasControls, videoSrc, loops, isMuted, autoPlays },
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
        if (autoPlays) {
          ref.play();
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
    }, [videoRef, autoPlays]);

    /* eslint-disable jsx-a11y/media-has-caption */
    const videoElement = (
      <>
        <video
          className={styles.jsVideo}
          loop={loops}
          muted={isMuted}
          onPlaying={() => setIsLoaded(true)}
          playsInline
          ref={videoRef}
          src={intersected ? videoSrc : ''}
        />
        <noscript>
          <video
            controls={hasControls}
            loop={loops}
            muted={isMuted}
            playsInline
            src={videoSrc}
          />
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
      >
        <img alt={alt} aria-hidden className={styles.placeholder} />
        {videoElement}
      </div>
    );
  },
);

LazyVideo.displayName = 'LazyVideo';

export default LazyVideo;
