import React, { useState } from 'react';
import styles from './VideoWithControls.module.scss';
import {
  trackPausePlay,
} from '../../utils/analyticsUtils';
import Video from './Video/Video';
import LazyLoad from '../LazyLoad/LazyLoad';
import { VideoData } from '../../types';
import useSharedUnmutedVideoState from './useSharedUnmutedVideoState';

type VideoWithControlsProps = {
  className?: String,
  hasAudio?: boolean,
  hasClickControls?: boolean,
  hasControls?: boolean,
  isAutoplaying?: boolean,
  isLooping?: boolean,
  video: VideoData,
};

const VideoWithControls = ({
  className = '',
  hasAudio = false,
  hasClickControls = false,
  hasControls = true,
  isAutoplaying = true,
  isLooping = true,
  video,
}: VideoWithControlsProps) => {
  const [hasPlayed, setHasPlayed] = useState(isAutoplaying);

  const [isMuted, handleToggleMuted] = useSharedUnmutedVideoState(video.hls);

  const [isPlaying, setIsPlaying] = useState(isAutoplaying);

  const handleTapVolumeToggle = e => {
    handleToggleMuted();
    e.stopPropagation();
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

  if (!video || !video.sources) {
    return null;
  }

  return (
    <LazyLoad>
      {({ hasIntersected }) => (
        <div className={`${styles.videoWrapper} ${className}`} onClick={handleTap}>
          <Video
            isAutoplaying={isAutoplaying}
            isLooping={isLooping}
            isMounted={hasIntersected}
            isMuted={!hasAudio || isMuted}
            isPlaying={isPlaying}
            onPlayStateChange={setIsPlaying}
            video={video}
          />

          {hasControls &&
            (hasPlayed ? (
              <div className={styles.videoControls}>
                <button onClick={handleTapPlayPause} type="button">
                  {isPlaying ? 'Pause' : 'Play'}
                </button>

                {hasAudio && (
                  <button onClick={handleTapVolumeToggle} type="button">
                    {isMuted ? 'Unmute' : 'Mute'}
                  </button>
                )}
              </div>
            ) : (
              <div className={styles.beforeFirstPlay}>{'Play video'}</div>
            ))}
        </div>
      )}
    </LazyLoad>
  );
};

export default VideoWithControls;
