import Hls from 'hls.js';
import { MutableRefObject, useCallback, useEffect } from 'react';

const useHlsVideo = ({
  isMounted,
  isAutoplaying,
  src,
  onReady,
  videoRef,
}: {
  isMounted: boolean;
  isAutoplaying: boolean;
  src: string;
  onReady: () => void;
  videoRef: MutableRefObject<HTMLVideoElement>;
}) => {
  const handlePlayOnCanPlay = useCallback(() => {
    const play = () => {
      if (isAutoplaying) {
        videoRef.current.play();
      }

      onReady();
    };

    if (videoRef.current.readyState >= 3) {
      play();

      return;
    }

    videoRef.current.addEventListener('canplay', play);
  }, [isAutoplaying, onReady, videoRef]);

  useEffect(() => {
    if (!isMounted || !videoRef.current) {
      return;
    }

    if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
      // eslint-disable-next-line no-param-reassign
      videoRef.current.src = src;
      handlePlayOnCanPlay();

      return;
    }

    const hls = new Hls({
      startLevel: window.innerWidth > 1280 ? 4 : 2,
    });

    hls.loadSource(src);
    hls.attachMedia(videoRef.current);

    hls.on(Hls.Events.MEDIA_ATTACHED, handlePlayOnCanPlay);
  }, [handlePlayOnCanPlay, isMounted, src, videoRef]);
};

export default useHlsVideo;
