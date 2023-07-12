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
  hasControls: boolean,
  isAutoplaying: boolean
  isLooping: boolean,
  isMuted: boolean,
  isPlaying?: boolean,
  video: VideoData,
};

const Video = ({ isAutoplaying = true, hasControls = true, isPlaying = true, isLooping = true, isMuted = true, video }: VideoProps) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const isFirstLoad = useRef(true);

  const [hasLoaded, setHasLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {

    if (isFirstLoad.current && videoRef.current) {
      isFirstLoad.current = false;
      const videoElement = document.createElement("video-js");

      videoElement.classList.add('vjs-big-play-centered');
      videoRef.current.appendChild(videoElement);

      const player = playerRef.current = videojs(videoElement, {
        sources: [{
          src: video.hls,
          type: "application/x-mpegURL"
        }],
        autoplay: isAutoplaying,
        muted: isMuted,
        controls: hasControls,
        fluid: true,
        loop: isLooping,
      }, () => {
        videojs.log('player is ready');
      });

      // Only consider the video loaded after it starts playing
      player.on('progress', () => {
        if (!hasLoaded) {
          console.log('goo')
          setHasLoaded(true)
        }
      })

      // TODO: Connect to shared muted state
      player.on('volumechange', () => {
        console.log(player.muted())
      })
    }
  }, [isMounted]);

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
    <LazyLoad callback={() => setIsMounted(true)}>
      {({ hasIntersected }) => (
        <div
          data-vjs-player
          className={`${styles.frame} ${hasLoadedClassName}`}
          style={aspectRatioStyle}
        >

          <img
            aria-hidden
            className={styles.placeholder}
            src={`data:image/jpeg;base64,${video.blur}`}
            style={aspectRatioStyle}
          />

          {isMounted && <div ref={videoRef} className={styles.video} style={aspectRatioStyle} />}

        </div>
      )}
    </LazyLoad>
  );
}
export default Video;
