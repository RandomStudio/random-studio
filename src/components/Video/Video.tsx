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

export type VideoProps = {
  hasControls?: boolean;
  isAutoplaying?: boolean;
  isLooping?: boolean;
  video?: VideoData;
};

type VideoJsComponent = Component & {
  handleClick: () => void;
};

const Video = ({
  isAutoplaying = true,
  hasControls = false,
  isLooping = true,
  video = null,
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
      controls: hasControls || hasNewControls,
      fluid: true,
      controlBar: {
        pictureInPictureToggle: false, // firefox
        subsCapsButton: false, // safari
        ...(hasNewControls && {
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
  }, [hasControls, hasNewControls, isAutoplaying, isLooping, video]);

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
    if (!player) {
      return;
    }

    const muteComponent = player
      .getChild('ControlBar')
      .getChild('VolumePanel')
      .getChild('MuteToggle') as VideoJsComponent;

    muteComponent.handleClick = toggleIsMuted;
  }, [player, toggleIsMuted]);

  if (!video) {
    return <div className={`${styles.frame} ${styles.brokenVideo}`} />;
  }

  const hasLoadedClassName = hasLoaded ? styles.isLoaded : '';
  const aspectRatioStyle = { aspectRatio: `${video.width} / ${video.height}` };

  const videoClasses = classNames(styles.video, {
    [styles.newControls]: hasNewControls,
  });

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

        {hasNewControls && (
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
