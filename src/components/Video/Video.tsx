import React, { useState, useEffect, useRef, useCallback } from 'react';
import videojs from 'video.js';
import Component from 'video.js/dist/types/component.d';
import Player from 'video.js/dist/types/player.d';
import classNames from 'classnames';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
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

  const router = useRouter();

  const projectSlug = router.query.slug;

  const hasFocusMode = searchParams.get('hasFocusMode');

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
    const focusMode = searchParamsObject.get('hasFocusMode');

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
      controls: hasControls || (hasControls && focusMode),
      fluid: true,
      controlBar: {
        pictureInPictureToggle: false, // firefox
        subsCapsButton: false, // safari
        ...(focusMode && {
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
  }, [hasFocusMode, player, toggleIsMuted]);

  if (!video) {
    return <div className={`${styles.frame} ${styles.brokenVideo}`} />;
  }

  const hasLoadedClassName = hasLoaded ? styles.isLoaded : '';
  const aspectRatioStyle = { aspectRatio: `${video.width} / ${video.height}` };

  const videoClasses = classNames(styles.video, {
    [styles.newControls]: hasFocusMode,
    [styles.oldControls]: !hasFocusMode,
  });

  const getCurrentTimeParam = () => {
    if (!player) {
      return null;
    }

    return `?time=${player.currentTime()}`;
  };

  const handleOpenFocusMode = () => {
    // TODO: Update the id with a real one
    const path = `/video/2c5d33bf-d194-42a5-b914-a342201c74e1/${projectSlug}`;

    const queryParams = getCurrentTimeParam();

    router.push(`${path}${queryParams}`);
  };

  return (
    <LazyLoad onIntersect={handleLoadVideo}>
      <div className={`${styles.frame} ${hasLoadedClassName}`} data-vjs-player>
        {!hasControls && hasFocusMode && (
          <PreviewControls handleClick={handleOpenFocusMode} />
        )}

        <img
          alt="video placeholder"
          aria-hidden
          className={styles.placeholder}
          src={`data:image/jpeg;base64,${video.blur}`}
          style={aspectRatioStyle}
        />

        {hasFocusMode && hasControls && (
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
