import React, { useState, useEffect, useRef, useCallback } from 'react';
import videojs from 'video.js';
import Component from 'video.js/dist/types/component.d';
import Player from 'video.js/dist/types/player.d';
import styles from './Video.module.scss';
import { VideoData } from '../../types/types';
import LazyLoad from '../LazyLoad/LazyLoad';
import useSharedUnmutedVideoState from './useSharedUnmutedVideoState';
import 'video.js/dist/video-js.css';

// This is available but not typed in video.js
type VideoJsComponent = Component & {
  handleClick: () => void;
};

export type VideoProps = {
  hasControls?: boolean;
  isAutoplaying?: boolean;
  isLooping?: boolean;
  video?: VideoData;
};

const Video = ({
  isAutoplaying = true,
  hasControls = false,
  isLooping = true,
  video = null,
}: VideoProps) => {
  const videoContainerRef = useRef(null);

  const [player, setPlayer] = useState<Player>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  const [isMuted, toggleIsMuted] = useSharedUnmutedVideoState(
    video?.hls ?? 'unknown',
  );

  const handleLoadVideo = useCallback(() => {
    if (!video) {
      return;
    }

    const videoElement = document.createElement('video-js');
    videoContainerRef.current.appendChild(videoElement);

    const videoJsPlayer = videojs(videoElement, {
      sources: [
        {
          src: video.hls,
          type: 'application/x-mpegURL',
        },
      ],
      autoplay: isAutoplaying,
      muted: true,
      controls: hasControls,
      fluid: true,
      controlBar: {
        pictureInPictureToggle: false, // firefox
        subsCapsButton: false, // safari
      },
      loop: isLooping,
      playsinline: true
    });

    setPlayer(videoJsPlayer);
  }, [hasControls, isAutoplaying, isLooping, video]);

  useEffect(() => {
    if (!player || hasLoaded) {
      return;
    }

    // Only consider the video loaded after it starts playing
    player.one('progress', () => {
      setHasLoaded(true);
    });
  }, [hasLoaded, player]);

  useEffect(() => {
    if (!player) {
      return;
    }

    const muteComponent = player
      .getChild('ControlBar')
      .getChild('VolumePanel')
      .getChild('MuteToggle') as VideoJsComponent;

    muteComponent.handleClick = toggleIsMuted;
  }, [player, toggleIsMuted]);

  useEffect(() => {
    if (!player) {
      return;
    }

    player.muted(isMuted);
  }, [isMuted, player]);

  if (!video) {
    return <div className={`${styles.frame} ${styles.brokenVideo}`} />;
  }

  const hasLoadedClassName = hasLoaded ? styles.isLoaded : '';
  const aspectRatioStyle = { aspectRatio: video.width / video.height };

  return (
    <LazyLoad onIntersect={handleLoadVideo}>
      <div className={`${styles.frame} ${hasLoadedClassName}`} data-vjs-player>
        <img
          alt="video placeholder"
          aria-hidden
          className={styles.placeholder}
          src={`data:image/jpeg;base64,${video.blur}`}
          style={aspectRatioStyle}
        />

        <div ref={videoContainerRef} style={aspectRatioStyle} />
      </div>
    </LazyLoad>
  );
};

export default Video;
