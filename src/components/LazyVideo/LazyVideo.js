import React, { useState, useMemo, useEffect, useRef } from 'react';
import styles from './LazyVideo.module.scss';
import vimeoLookup from '../../../infrastructure/vimeoLookup.json';

const LazyVideo = React.forwardRef(
  ({ alt, className, videoSrc, loops, isMuted, autoPlays }, parentRef) => {
    const localRef = useRef();
    const videoRef = parentRef ?? localRef;
    const [noJS, setNoJS] = useState(true);
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
      setNoJS(false);

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
    }, [noJS, videoRef, autoPlays]);

    const videoElement = (
      // eslint-disable-next-line jsx-a11y/media-has-caption
      <video
        loop={loops}
        muted={isMuted}
        onPlaying={() => setIsLoaded(true)}
        playsInline
        ref={videoRef}
        src={intersected ? videoSrc : ''}
      />
    );

    if (!vimeoLookup[id]) {
      return videoElement;
    }

    const { height, thumb, width } = vimeoLookup[id];

    // Prevents autoplay conflicting
    return (
      <div
        className={`${styles.frame} ${className} ${
          isLoaded ? styles.isLoaded : ''
        }`}
        style={{
          aspectRatio: `${width} / ${height}`,
        }}
      >
        <img
          alt={alt}
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
