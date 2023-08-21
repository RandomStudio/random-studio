import Hls from 'hls.js';
import { MutableRefObject, useEffect } from 'react';

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
  useEffect(() => {
    if (!isMounted || !videoRef.current || !Hls.isSupported()) {
      return;
    }

    if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
      // eslint-disable-next-line no-param-reassign
      videoRef.current.src = src;

      videoRef.current.addEventListener('canplay', () => {
        if (isAutoplaying) {
          videoRef.current.play();
        }

        onReady();
      });

      return;
    }

    const hls = new Hls({
      startLevel: window.innerWidth > 1280 ? 4 : 2,
    });

    hls.loadSource(src);
    hls.attachMedia(videoRef.current);

    hls.on(Hls.Events.MEDIA_ATTACHED, () => {
      if (isAutoplaying) {
        videoRef.current.play();
      }

      onReady();
    });
  }, [isMounted, videoRef, onReady, isAutoplaying, src]);
};

export default useHlsVideo;
