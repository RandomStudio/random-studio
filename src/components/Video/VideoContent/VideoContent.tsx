import React, { useState, useEffect, useRef, useCallback } from 'react';
import videojs from 'video.js';
import Component from 'video.js/dist/types/component.d';
import Player from 'video.js/dist/types/player.d';
import classNames from 'classnames';
import { useSearchParams } from 'next/navigation';
import styles from './VideoContent.module.scss';
import LazyLoad from '../../LazyLoad/LazyLoad';
import useSharedUnmutedVideoState from '../useSharedUnmutedVideoState';
import 'video.js/dist/video-js.css';
import Controls from '../Controls/Controls';
import { VideoData } from '../../../types/types';
import FocusModeControls from '../FocusModeControls/FocusModeControls';

export type VideoContentProps = {
  hasControls: boolean;
  isAutoplaying: boolean;
  isFocused: boolean;
  isLooping: boolean;
  video: VideoData;
  handleClick?: (time: number) => void;
};

type VideoJsComponent = Component & {
  handleClick: () => void;
};

const VideoContent = ({
  isAutoplaying,
  hasControls,
  isLooping,
  video: { baseUrl, blur, height, hls, width },
  isFocused,
  handleClick = null,
}: VideoContentProps) => {
  const videoContainerRef = useRef(null);

  const searchParams = useSearchParams();
  const hasFocusMode = searchParams.get('hasFocusMode');

  const [player, setPlayer] = useState<Player>(null);
  const [isPlaying, setIsPlaying] = useState(isAutoplaying);
  const [hasLoaded, setHasLoaded] = useState(false);

  const [isMuted, toggleIsMuted] = useSharedUnmutedVideoState(hls ?? 'unknown');

  const handlePlayToggle = () => {
    if (!player) {
      return;
    }

    if (player.paused()) {
      player.play();

      return;
    }

    player.pause();
  };

  const handleLoadVideo = useCallback(() => {
    // Have to do it again manually here, since all searchParams from the
    // useSearchParams hook are undefined on initial render
    const searchParamsObject = new URLSearchParams(window.location.search);
    const focusModeControls = searchParamsObject.get('hasFocusMode');

    const hideNativeControls = focusModeControls || isFocused;

    const videoElement = document.createElement('video-js');
    videoContainerRef.current.appendChild(videoElement);

    const videoJsPlayer = videojs(videoElement, {
      sources: [
        {
          src: hls,
          type: 'application/x-mpegURL',
        },
      ],
      autoplay: isAutoplaying,
      muted: true,
      controls: !hideNativeControls,
      fluid: true,
      controlBar: {
        pictureInPictureToggle: false, // firefox
        subsCapsButton: false, // safari
        ...(hideNativeControls && {
          volumePanel: false,
          playToggle: false,
          fullscreenToggle: false,
        }),
      },
      loop: isLooping,
      playsinline: true,
    });

    videoJsPlayer.on('play', () => {
      setIsPlaying(true);
    });

    videoJsPlayer.on('pause', () => {
      setIsPlaying(false);
    });

    setPlayer(videoJsPlayer);
  }, [hls, isAutoplaying, isFocused, isLooping]);

  useEffect(() => {
    if (!player) {
      return;
    }

    if (isPlaying) {
      player.play();
    } else {
      player.pause();
    }
  }, [isPlaying, player]);

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

    player.muted(isMuted);
  }, [isMuted, player]);

  useEffect(() => {
    // Doesn't work with new controls yet
    if (!player) {
      return;
    }

    const VolumePanel = player.getChild('ControlBar').getChild('VolumePanel');

    // With new controls we delete the Volume panel
    if (!VolumePanel) {
      return;
    }

    const muteComponent = VolumePanel.getChild(
      'MuteToggle',
    ) as VideoJsComponent;

    muteComponent.handleClick = toggleIsMuted;
  }, [hasFocusMode, player, toggleIsMuted]);

  const hasLoadedClassName = hasLoaded ? styles.isLoaded : '';
  const aspectRatioStyle = { aspectRatio: `${width} / ${height}` };

  const videoClasses = classNames(styles.video, {
    [styles.newControls]: hasFocusMode,
    [styles.oldControls]: !hasFocusMode,
  });

  const handleVideoClick = () => {
    if (hasControls && hasFocusMode && player) {
      const currentTime = player.currentTime();
      handleClick(currentTime);
    }
  };

  return (
    <LazyLoad onIntersect={handleLoadVideo}>
      <div
        className={`${styles.frame} ${hasLoadedClassName}`}
        data-vjs-player
        onClick={handleVideoClick}
      >
        {hasControls && hasFocusMode && <FocusModeControls />}

        <img
          alt="video placeholder"
          aria-hidden
          className={styles.placeholder}
          src={`data:image/jpeg;base64,${blur}`}
          style={aspectRatioStyle}
        />

        {isFocused && (
          <Controls
            baseUrl={baseUrl}
            handleMuteToggle={toggleIsMuted}
            handlePlayToggle={handlePlayToggle}
            isMuted={isMuted}
            isPlaying={isPlaying}
          />
        )}

        <div
          className={videoClasses}
          ref={videoContainerRef}
          style={aspectRatioStyle}
        />
      </div>
    </LazyLoad>
  );
};

export default VideoContent;
