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
    if (!isMounted || !videoRef.current) {
      return;
    }

    // if HLS is natively supported, we don't have to do anything
    if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
      onReady();

      if (isAutoplaying) {
        videoRef.current
          .play()
          .catch(e =>
            console.warn('Unable to autoplay without user interaction', e),
          );
      }

      return;
    }

    const hls = new Hls({
      startLevel: window.innerWidth > 1280 ? 4 : 2,
    });

    hls.attachMedia(videoRef.current);

    hls.on(Hls.Events.MEDIA_ATTACHED, () => {
      hls.loadSource(src);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (isAutoplaying) {
          try {
            videoRef.current.play();
          } catch (e) {
            console.warn('Unable to autoplay without user interaction');
          }
        }

        onReady();
      });
    });
  }, [isMounted, videoRef, onReady, isAutoplaying, src]);
};

export default useHlsVideo;
