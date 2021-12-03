import React, { useState, useEffect } from 'react';

const LazyVideo = React.forwardRef(
  ({ videoSrc, loops, isMuted, autoPlays }, ref) => {
    const [noJS, setNoJS] = useState(true);
    const [intersected, setIntersected] = useState(false);

    useEffect(() => {
      // Referrence for cleanup
      const videoRef = ref;
      setNoJS(false);

      const handlePlayer = () => {
        if (autoPlays) {
          videoRef.current.play();
        }
      };

      if (videoRef.current) {
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

        observer.observe(videoRef.current);

        return () => {
          if (videoRef.current) {
            observer.unobserve(videoRef.current);
          }

          observer.disconnect();
        };
      }
    }, [noJS, ref, autoPlays]);

    // Prevents autoplay conflicting
    return (
      <>
        {!noJS && (
          <video
            loop={loops}
            muted={isMuted}
            playsInline
            ref={ref}
            src={intersected ? videoSrc : ''}
          />
        )}

        <noscript>
          <video
            autoPlay={autoPlays}
            loop={loops}
            muted={isMuted}
            playsInline
            ref={ref}
            src={videoSrc}
          />
        </noscript>
      </>
    );
  },
);

LazyVideo.propTypes = {};
LazyVideo.defaultProps = {};

export default LazyVideo;
