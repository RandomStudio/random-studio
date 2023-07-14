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
import useSharedUnmutedVideoState from './useSharedUnmutedVideoState';
import Player from 'video.js/dist/types/player';
import Component from 'video.js/dist/types/component';

// This is available but not typed in video.js
type VideoJsComponent = Component & {
  handleClick: () => void
}

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

  const [player, setPlayer] = useState<Player>(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isMuted, toggleIsMuted] = useSharedUnmutedVideoState(video.hls);

  const handleLoadVideo = () => {
    const videoElement = document.createElement("video-js");
    videoContainerRef.current.appendChild(videoElement);

    const videoJsPlayer = videojs(videoElement, {
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

    setPlayer(videoJsPlayer);
  };

  useEffect(() => {
    if (!player || hasLoaded) {
      return;
    }

    // Only consider the video loaded after it starts playing
    player.one('progress', () => {
      setHasLoaded(true);
    })
  }, [hasLoaded, player]);

  useEffect(() => {
    if (!player) {
      return;
    }
    const muteComponent = player.getChild('ControlBar').getChild('VolumePanel').getChild('MuteToggle') as VideoJsComponent;
    muteComponent.handleClick = toggleIsMuted;
  }, [player, toggleIsMuted]);

  useEffect(() => {
    if (!player) {
      return;
    }

    player.muted(isMuted);
  }, [isMuted]);

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
