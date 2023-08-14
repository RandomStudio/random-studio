import React, { useState, useEffect, useRef, useCallback } from 'react';
import videojs from 'video.js';
import Component from 'video.js/dist/types/component.d';
import Player from 'video.js/dist/types/player.d';
import classNames from 'classnames';
import { useSearchParams } from 'next/navigation';
import styles from './Video.module.scss';
import { VideoData } from '../../types/types';
import LazyLoad from '../LazyLoad/LazyLoad';
import useSharedUnmutedVideoState from './useSharedUnmutedVideoState';
import 'video.js/dist/video-js.css';
import Controls from './Controls/Controls';
import PreviewControls from './PreviewControls/PreviewControls';

export type VideoProps = {
  hasControls?: boolean;
  isAutoplaying?: boolean;
  isLooping?: boolean;
  video?: VideoData;
  focusUrl?: string;
};

type VideoJsComponent = Component & {
  handleClick: () => void;
};

const Video = ({
  isAutoplaying = true,
  hasControls = false,
  isLooping = true,
  video = null,
  focusUrl = '',
}: VideoProps) => {
  const videoContainerRef = useRef(null);

  const searchParams = useSearchParams();

  const hasNewControls = searchParams.get('hasNewControls');

  const [player, setPlayer] = useState<Player>(null);
  const [isPlaying, setIsPlaying] = useState(isAutoplaying);
  const [hasLoaded, setHasLoaded] = useState(false);

  const [isMuted, toggleIsMuted] = useSharedUnmutedVideoState(
    video?.hls ?? 'unknown',
  );

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
    if (!video) {
      return;
    }

    // Have to do it again manually here, since all searchParams from the
    // useSearchParams hook are undefined on initial render
    const searchParamsObject = new URLSearchParams(window.location.search);
    const newControls = searchParamsObject.get('hasNewControls');

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
      controls: hasControls || (hasControls && newControls),
      fluid: true,
      controlBar: {
        pictureInPictureToggle: false, // firefox
        subsCapsButton: false, // safari
        ...(newControls && {
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
  }, [hasControls, isAutoplaying, isLooping, video]);

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
  }, [hasNewControls, player, toggleIsMuted]);

  if (!video) {
    return <div className={`${styles.frame} ${styles.brokenVideo}`} />;
  }

  const hasLoadedClassName = hasLoaded ? styles.isLoaded : '';
  const aspectRatioStyle = { aspectRatio: `${video.width} / ${video.height}` };

  const videoClasses = classNames(styles.video, {
    [styles.newControls]: hasNewControls,
    [styles.oldControls]: !hasNewControls,
  });

  return (
    <LazyLoad onIntersect={handleLoadVideo}>
      {!hasControls && hasNewControls && (
        <PreviewControls video={video} videoUrl="test" />
      )}

      <div className={`${styles.frame} ${hasLoadedClassName}`} data-vjs-player>
        <img
          alt="video placeholder"
          aria-hidden
          className={styles.placeholder}
          src={`data:image/jpeg;base64,${video.blur}`}
          style={aspectRatioStyle}
        />

        {hasNewControls && hasControls && (
          <Controls
            handleMuteToggle={toggleIsMuted}
            handlePlayToggle={handlePlayToggle}
            isMuted={isMuted}
            isPlaying={isPlaying}
            video={video}
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

export default Video;
