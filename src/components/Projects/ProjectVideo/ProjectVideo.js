import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
// import { trackCustomEvent } from 'gatsby-plugin-google-analytics';
import styles from './ProjectVideo.module.scss';
import LazyVideo from '../../LazyVideo/LazyVideo';

const trackCustomEvent = input => console.log(input);

const trackPausePlay = isPlaying => {
  trackCustomEvent({
    action: isPlaying ? 'Pause' : 'Play',
    category: isPlaying ? 'Pause Button' : 'Play Button',
    label: 'Video Player Interactions',
  });
};

const trackIsCurrentlyMuted = isCurrentlyMuted => {
  trackCustomEvent({
    category: isCurrentlyMuted ? 'Unmute Button' : 'Mute Button',
    action: isCurrentlyMuted ? 'Unmute' : 'Mute',
    label: 'Video Player Interactions',
  });
};

const ProjectVideo = ({
  video: {
    autoplay,
    hasControls,
    isMuted: isStartingMuted,
    loops,
    url,
    isAlwaysMuted,
  },
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

    e.stopPropagation();
    trackPausePlay(isPlaying);
  };

  return (
    <div className={styles.videoWrapper} onClick={handleTapPlayPause}>
      <LazyVideo
        autoPlays={isPlaying}
        isMuted={isAlwaysMuted || isCurrentlyMuted}
        loops={loops}
        ref={videoRef}
        videoSrc={url}
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

ProjectVideo.propTypes = {
  autoplay: PropTypes.bool,
  hasControls: PropTypes.bool,
  isAlwaysMuted: PropTypes.bool,
  isMuted: PropTypes.bool,
  loops: PropTypes.bool,
  url: PropTypes.string.isRequired,
};

ProjectVideo.defaultProps = {
  autoplay: true,
  hasControls: true,
  isAlwaysMuted: false,
  isMuted: true,
  loops: true,
};

export default ProjectVideo;
