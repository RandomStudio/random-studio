import React, { useRef, useState } from 'react';
import { trackCustomEvent } from 'gatsby-plugin-google-analytics';
import styles from './ProjectVideo.module.scss';
import LazyVideo from '../../../components/LazyVideo/LazyVideo';

const trackPausePlay = isPlaying => {
  trackCustomEvent({
    category: isPlaying ? 'Pause Button' : 'Play Button',
    action: isPlaying ? 'Pause' : 'Play',
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
    autoplay, hasControls, isMuted: isStartingMuted, loops, url,
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
    trackIsCurrentlyMuted(isCurrentlyMuted)
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
    <div
      className={styles.videoWrapper}
      onClick={handleTapPlayPause}
      style={{ paddingBottom: `${ratio}%` }}
    >
      <LazyVideo
        ref={videoRef}
        videoSrc={url}
        loops={loops}
        isMuted={isCurrentlyMuted}
        autoPlays={isPlaying}
      />
      {hasControls
        && (hasPlayed ? (
          <div className={styles.videoControls}>
            <button type='button' onClick={handleTapPlayPause}>
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            <button type='button' onClick={handleTapVolumeToggle}>
              {isCurrentlyMuted ? 'Unmute' : 'Mute'}
            </button>
          </div>
        ) : (
          <div className={styles.beforeFirstPlay}>Play video</div>
        ))}
    </div>
  );
};

export default ProjectVideo;
