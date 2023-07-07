/* eslint-disable jsx-a11y/media-has-caption */
import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  CSSProperties,
} from 'react';
import Hls from 'hls.js';
import styles from './Video.module.scss';
import { VideoData } from '../../../types';

export type VideoProps = {
  isAutoplaying: boolean
  isLooping: boolean,
  isMounted: boolean,
  isMuted: boolean,
  isPlaying: boolean,
  onPlayStateChange: (isPlaying: boolean) => void
  video: VideoData,
};

const Video = ({ isAutoplaying = true, isPlaying = true, isLooping = true, isMounted = true, isMuted = true, onPlayStateChange = () => null, video }: VideoProps) => {
  const ref = useRef<HTMLVideoElement>(null);

  const [hasFailed, setHasFailed] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);
  const handlePlay = useCallback(async () => {
    if (!ref.current) {
      return;
    }

    try {
      await ref.current.play();
      onPlayStateChange(true);
      setHasFailed(false);
    } catch (err) {
      console.warn(err);
      onPlayStateChange(false);
    } finally {
      setHasLoaded(true);
    }
  }, []);

  // Initialize HLs in an effect
  useEffect(() => {
    if (
      !isMounted ||
      !ref.current ||
      ref.current.canPlayType('application/vnd.apple.mpegurl') ||
      !Hls.isSupported()
    ) {
      return;
    }

    const hls = new Hls({
      startLevel: window.innerWidth > 1280 ? 4 : 2,
    });
    hls.loadSource(video.hls);
    hls.attachMedia(ref.current);

    if (isAutoplaying) {
      handlePlay()
    }
  }, [isAutoplaying, isMounted, ref, video.hls]);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    if (isPlaying) {
      handlePlay();
      return;
    }
    ref.current.pause();
    onPlayStateChange(false);
  }, [isPlaying]);


  const fallbackMp4Src = useMemo<string>(() => {
    const { baseUrl, sources } = video;

    const sizes = sources
      .map(source => parseInt(source.replace('p', '')))
      .filter(size => size < 721)
      .sort((a, b) => a - b);

    return `${baseUrl}/play_${sizes[0]}p.mp4`;
  }, [video.sources])

  const hasLoadedClassName = hasLoaded ? styles.isLoaded : '';

  return (
    <div
      className={`${styles.frame} ${hasLoadedClassName}`}
      style={{
        '--aspectRatio': `${video.width} / ${video.height}`,
      } as CSSProperties}
    >
      {isMounted ? (
        <>
          <video
            autoPlay={isAutoplaying}
            loop={isLooping}
            muted={isMuted}
            playsInline
            poster={video.fallback}
            ref={ref}
          >
            <source src={video.hls} type="application/x-mpegURL" />
            <source src={fallbackMp4Src} type="video/mp4" />
          </video>
          {hasFailed && <img className={styles.placeholder} src={video.fallback} />}
        </>
      ) : (
        <img
          aria-hidden
          className={styles.placeholder}
          src={`data:image/jpeg;base64,${video.blur}`}
          style={{
            aspectRatio: video.width / video.height
          }}
        />
      )}
    </div>
  );
};

export default Video;
