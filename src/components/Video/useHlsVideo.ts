import Hls from 'hls.js';
import { MutableRefObject, useEffect, useRef } from 'react';

const useHlsVideo = ({
  isMounted,
  isAutoplaying,
  src,
  onPlay,
  onReady,
  videoRef,
}: {
  isMounted: boolean;
  isAutoplaying: boolean;
  src: string;
  onPlay: () => void;
  onReady: () => void;
  videoRef: MutableRefObject<HTMLVideoElement>;
}) => {
  const onPlayRef = useRef(onPlay);
  const onReadyRef = useRef(onReady);

  useEffect(() => {
    if (!isMounted || !videoRef.current) {
      return undefined;
    }

    const onPlayCallback = onPlayRef.current;
    const onReadyCallback = onReadyRef.current;

    const videoEl = videoRef.current;
    let hls: Hls;

    videoEl.addEventListener('loadedmetadata', onReadyCallback);

    // if HLS is natively supported, we don't have to do anything
    if (videoEl.canPlayType('application/vnd.apple.mpegurl')) {
      if (isAutoplaying) {
        onPlayCallback();
      }
    } else {
      hls = new Hls({
        startLevel: window.innerWidth > 1280 ? 4 : 2,
      });

      hls.attachMedia(videoEl);

      hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        hls.loadSource(src);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          if (isAutoplaying) {
            onPlayCallback();
          }
        });
      });
    }

    return () => {
      videoEl.removeEventListener('loadedmetadata', onReadyCallback);
      hls?.destroy();
    };
  }, [isMounted, videoRef, isAutoplaying, src]);
};

export default useHlsVideo;
