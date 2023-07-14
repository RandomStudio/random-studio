import React, {
  useState,
  useEffect,
  useRef
} from 'react';
import styles from './Video.module.scss';
import { VideoData } from '../../types';
import LazyLoad from '../LazyLoad/LazyLoad';

import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import useSharedUnmutedVideoState from './useSharedActivePlayerState';
import useSharedActivePlayerState from './useSharedActivePlayerState';
import Player from 'video.js/dist/types/player';

export type VideoProps = {
  hasControls?: boolean,
  isAutoplaying?: boolean
  isLooping?: boolean,
  isMuted?: boolean,
  isPlaying?: boolean,
  video: VideoData,
};

const Video = ({
  isAutoplaying = true,
  hasControls = false,
  isPlaying = true,
  isLooping = true,
  video
}: VideoProps) => {
  const videoContainerRef = useRef(null);
  const playerRef = useRef<Player>(null);

  const [hasLoaded, setHasLoaded] = useState(false);
  const [isActivePlayer, setIsActivePlayer] = useSharedActivePlayerState(video.hls);

  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  const handleLoadVideo = () => {
    const videoElement = document.createElement("video-js");
    videoContainerRef.current.appendChild(videoElement);

    const player = videojs(videoElement, {
      sources: [{
        src: video.hls,
        type: "application/x-mpegURL"
      }],
      autoplay: isAutoplaying,
      muted: true,
      controls: hasControls,
      fluid: true,
      controlBar: {
        pictureInPictureToggle: false, //firefox
        subsCapsButton: false //safari
      },
      loop: isLooping,
    });

    playerRef.current = player;

    // Only consider the video loaded after it starts playing
    player.on('progress', () => {
      if (!hasLoaded) {
        setHasLoaded(true)
      }
    })

    player.controlBar.volumePanel.muteToggle.el().addEventListener('pointerdown', (event) => {
      setIsActivePlayer(!player.muted());
      event.stopPropagation();
      event.preventDefault();
      return false;
    })
  };

  const hasLoadedClassName = hasLoaded ? styles.isLoaded : '';

  const aspectRatioStyle = { aspectRatio: video.width / video.height }

  if (!video) {
    return <div className={`${styles.frame} ${styles.brokenVideo}`} />
  }

  return (
    <LazyLoad onIntersect={handleLoadVideo}>
      <div
        data-vjs-player
        className={`${styles.frame} ${hasLoadedClassName}`}
      >

        <img
          aria-hidden
          className={styles.placeholder}
          src={`data:image/jpeg;base64,${video.blur}`}
          style={aspectRatioStyle}
        />

        <div ref={videoContainerRef} style={aspectRatioStyle} />

      </div>
    </LazyLoad>
  );
}
export default Video;
