import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ProjectVideo.module.scss';
import LazyVideo from '../../../components/LazyVideo/LazyVideo';

const ProjectVideo = ({
  video: {
    autoplay,
    hasControls,
    isMuted: isStartingMuted,
    loops,
    url,
    isAlwaysMuted,
  },
  ratio,
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
  };

  return (
    <div
      className={styles.videoWrapper}
      onClick={handleTapPlayPause}
      style={{ paddingBottom: `${ratio}%` }}
    >
      <LazyVideo
        ref={videoRef}
        videoSrc={url}
        loops={loops}
        isMuted={isAlwaysMuted || isCurrentlyMuted}
        autoPlays={isPlaying}
      />
      {hasControls &&
        (hasPlayed ? (
          <div className={styles.videoControls}>
            <button type="button" onClick={handleTapPlayPause}>
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            {!isAlwaysMuted && (
              <button type="button" onClick={handleTapVolumeToggle}>
                {isCurrentlyMuted ? 'Unmute' : 'Mute'}
              </button>
            )}
          </div>
        ) : (
          <div className={styles.beforeFirstPlay}>Play video</div>
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
