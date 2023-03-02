import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './VideoWithControls.module.scss';
import LazyVideo from '../LazyVideo/LazyVideo.tsx';
import { videoPropType } from '../../propTypes';
import {
  trackIsCurrentlyMuted,
  trackPausePlay,
} from '../../utils/analyticsUtils';

const VideoWithControls = ({
  className,
  hasClickControls,
  hasControls,
  hasAudio,
  isAutoplaying,
  isLooping,
  video,
  width,
}) => {
  const [hasPlayed, setHasPlayed] = useState(isAutoplaying);

  const [isCurrentlyMuted, setIsCurrentlyMuted] = useState(
    isAutoplaying || !hasAudio,
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
      const newPlayingState = !prevState;
      trackPausePlay(newPlayingState);

      return newPlayingState;
    });
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
        isAutoplaying={isAutoplaying}
        isLooping={isLooping}
        isMuted={!hasAudio || isCurrentlyMuted}
        isPlaying={isPlaying}
        onPlayStateChange={setIsPlaying}
        video={video}
        width={width}
      />

      {hasControls &&
        (hasPlayed ? (
          <div className={styles.videoControls}>
            <button onClick={handleTapPlayPause} type="button">
              {isPlaying ? 'Pause' : 'Play'}
            </button>

            {hasAudio && (
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
  hasAudio: PropTypes.bool,
  hasClickControls: PropTypes.bool,
  hasControls: PropTypes.bool,
  isAutoplaying: PropTypes.bool,
  isLooping: PropTypes.bool,
  video: videoPropType.isRequired,
  width: PropTypes.number,
};

VideoWithControls.defaultProps = {
  className: '',
  hasAudio: false,
  hasClickControls: false,
  hasControls: true,
  isAutoplaying: true,
  isLooping: true,
  width: 100,
};

export default VideoWithControls;
