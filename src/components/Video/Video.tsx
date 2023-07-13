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
  isMuted = true,
  video
}: VideoProps) => {
  const videoContainerRef = useRef(null);
  const playerRef = useRef(null);

  const [hasLoaded, setHasLoaded] = useState(false);


  if (!video) {
    return <div className={`${styles.frame} ${styles.brokenVideo}`} />
  }


  const onPlayerReady = (player) => {

    // TODO: Add custom buttons on the player (download)

    // let downloadButtonElement = document.createElement('button')
    // downloadButtonElement.innerHTML = '⤓';

    // console.log(player.controlBar);

    // player.controlBar.el().insertBefore(downloadButtonElement, player.controlBar.getChild('FullscreenToggle').el());

    // player.addClass('vjs-vjsdownload');
  };

  const handleLoadVideo = () => {

    const videoElement = document.createElement("video-js");
    videoContainerRef.current.appendChild(videoElement);

    const player = playerRef.current = videojs(videoElement, {
      sources: [{
        src: video.hls,
        type: "application/x-mpegURL"
      }],
      autoplay: isAutoplaying,
      muted: isMuted,
      controls: hasControls,
      fluid: true,
      controlBar: {
        pictureInPictureToggle: false, //firefox
        subsCapsButton: false //safari
      },
      loop: isLooping,
    }, () => onPlayerReady(player));

    // Only consider the video loaded after it starts playing
    player.on('progress', () => {
      if (!hasLoaded) {
        setHasLoaded(true)
      }
    })

    // TODO: Connect to shared muted state
    player.on('volumechange', () => {
      console.log(player.muted())
    })
  };

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.muted(isMuted);
    }
  }, [isMuted])

  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  const hasLoadedClassName = hasLoaded ? styles.isLoaded : '';

  const aspectRatioStyle = { aspectRatio: video.width / video.height }

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
