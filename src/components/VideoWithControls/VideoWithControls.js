import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { event } from 'react-ga';
import styles from './VideoWithControls.module.scss';
import LazyVideo from '../LazyVideo/LazyVideo';

const trackPausePlay = isPlaying => {
  event({
    action: isPlaying ? 'Pause' : 'Play',
    category: isPlaying ? 'Pause Button' : 'Play Button',
    label: 'Video Player Interactions',
  });
};

const trackIsCurrentlyMuted = isCurrentlyMuted => {
  event({
    category: isCurrentlyMuted ? 'Unmute Button' : 'Mute Button',
    action: isCurrentlyMuted ? 'Unmute' : 'Mute',
    label: 'Video Player Interactions',
  });
};

const VideoWithControls = ({
  autoplay,
  className,
  hasClickControls,
  hasControls,
  isMuted: isStartingMuted,
  loops,
  isAlwaysMuted,
  video,
}) => {
  const videoRef = useRef(null);

  const [hasPlayed, setHasPlayed] = useState(autoplay);

  const [isCurrentlyMuted, setIsCurrentlyMuted] = useState(
    autoplay || isStartingMuted,
  );

  const [isPlaying, setIsPlaying] = useState(autoplay);

  const handleTapVolumeToggle = e => {
    setIsCurrentlyMuted(prevState => !prevState);
    e.stopPropagation();
    trackIsCurrentlyMuted(isCurrentlyMuted);
  };

  const handleTapPlayPause = e => {
    e.stopPropagation();

    if (!hasClickControls) {
      return;
    }

    if (!hasPlayed) {
      setHasPlayed(true);
    }

    setIsPlaying(prevState => {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }

      return !prevState;
    });

    trackPausePlay(isPlaying);
  };

  return (
    <div
      className={`${styles.videoWrapper} ${className}`}
      onClick={handleTapPlayPause}
    >
      <LazyVideo
        autoPlays={isPlaying}
        hasControls
        isMuted={isAlwaysMuted || isCurrentlyMuted}
        loops={loops}
        ref={videoRef}
        video={video}
      />
      {hasControls &&
        (hasPlayed ? (
          <div className={styles.videoControls}>
            <button onClick={handleTapPlayPause} type="button">
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            {!isAlwaysMuted && (
              <button onClick={handleTapVolumeToggle} type="button">
                {isCurrentlyMuted ? 'Unmute' : 'Mute'}
              </button>
            )}
          </div>
        ) : (
          <div className={styles.beforeFirstPlay}>{'Play video'}</div>
        ))}
    </div>
  );
};

VideoWithControls.propTypes = {
  autoplay: PropTypes.bool,
  hasControls: PropTypes.bool,
  isAlwaysMuted: PropTypes.bool,
  isMuted: PropTypes.bool,
  loops: PropTypes.bool,
  video: PropTypes.shape({}).isRequired,
};

VideoWithControls.defaultProps = {
  autoplay: true,
  hasControls: true,
  isAlwaysMuted: false,
  isMuted: true,
  loops: true,
};

export default VideoWithControls;
