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

    if (videoEl.canPlayType('application/vnd.apple.mpegurl')) {
      videoEl.src = src;
      if (isAutoplaying) {
        onPlayCallback();
      }
    } else {
      hls = new Hls({
        startLevel: window.innerWidth > 1280 ? 4 : 2,
        abrEwmaDefaultEstimate: 10_000_000,
      });
      hls.loadSource(src);
      hls.attachMedia(videoEl);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (isAutoplaying) {
          onPlayCallback();
        }
      });
    }

    return () => {
      videoEl.removeEventListener('loadedmetadata', onReadyCallback);
      hls?.destroy();
    };
  }, [isMounted, videoRef, isAutoplaying, src]);
};

export default useHlsVideo;
