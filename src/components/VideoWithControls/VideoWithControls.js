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
  className,
  hasClickControls,
  hasControls,
  isMuted: isStartingMuted,
  isAutoplaying,
  isLooping,
  isAlwaysMuted,
  video,
}) => {
  const videoRef = useRef(null);

  const [hasPlayed, setHasPlayed] = useState(isAutoplaying);

  const [isCurrentlyMuted, setIsCurrentlyMuted] = useState(
    isAutoplaying || isStartingMuted,
  );

  const [isPlaying, setIsPlaying] = useState(isAutoplaying);

  const handleTapVolumeToggle = e => {
    setIsCurrentlyMuted(prevState => !prevState);
    e.stopPropagation();
    trackIsCurrentlyMuted(isCurrentlyMuted);
  };

  const handleTapPlayPause = e => {
    e.stopPropagation();

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

  const handleTap = e => {
    if (!hasClickControls) {
      return;
    }

    handleTapPlayPause(e);
  };

  return (
    <div className={`${styles.videoWrapper} ${className}`} onClick={handleTap}>
      <LazyVideo
        hasControls
        isAutoplaying={isPlaying}
        isLooping={isLooping}
        isMuted={isAlwaysMuted || isCurrentlyMuted}
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
  className: PropTypes.string,
  hasClickControls: PropTypes.bool,
  hasControls: PropTypes.bool,
  isAlwaysMuted: PropTypes.bool,
  isAutoplaying: PropTypes.bool,
  isLooping: PropTypes.bool,
  isMuted: PropTypes.bool,
  video: PropTypes.shape({}).isRequired,
};

VideoWithControls.defaultProps = {
  className: '',
  hasClickControls: false,
  hasControls: true,
  isAlwaysMuted: false,
  isAutoplaying: true,
  isLooping: true,
  isMuted: true,
};

export default VideoWithControls;
