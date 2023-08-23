import { useEffect, useState } from 'react';

const useReactiveVideoProperty = (
  video: HTMLVideoElement,
  property: keyof HTMLVideoElement,
  event: keyof HTMLVideoElementEventMap,
) => {
  const [value, setValue] = useState(video[property]);

  useEffect(() => {
    const listener = () => setValue(video[property]);
    video.addEventListener(event, listener);

    return () => video.removeEventListener(event, listener);
  }, [video, event, property]);

  return value;
};

export default useReactiveVideoProperty;
