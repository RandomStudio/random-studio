import React, { useState, useMemo, useEffect, useRef } from 'react';
import styles from './LazyVideo.module.scss';
import vimeoLookup from '../../../infrastructure/vimeoLookup.json';

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

    const id = useMemo(() => {
      if (!videoSrc) {
        return null;
      }

      const matches = videoSrc.match(
        /https:\/\/player\.vimeo\.com\/external\/(.*)\./,
      );

      if (!matches) {
        return null;
      }

      return matches[1].split('.')[0];
    }, [videoSrc]);

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

    const { height, thumb, width } = vimeoLookup?.[id] ?? {};

    /* eslint-disable jsx-a11y/media-has-caption */
    const videoElement = (
      <>
        <video
          className={styles.jsVideo}
          loop={loops}
          muted={isMuted}
          onPlaying={() => setIsLoaded(true)}
          playsInline
          poster={thumb ? `data:image/jpeg;base64,${thumb}` : null}
          ref={videoRef}
          src={intersected ? videoSrc : ''}
        />
        <noscript>
          <video
            controls={hasControls}
            loop={loops}
            muted={isMuted}
            playsInline
            poster={thumb ? `data:image/jpeg;base64,${thumb}` : null}
            src={videoSrc}
          />
        </noscript>
      </>
    );
    /* eslint-enable jsx-a11y/media-has-caption */

    if (!vimeoLookup[id]) {
      return videoElement;
    }

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
          src={`data:image/jpeg;base64,${thumb}`}
        />
        {videoElement}
      </div>
    );
  },
);

LazyVideo.displayName = 'LazyVideo';

export default LazyVideo;
