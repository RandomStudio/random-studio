import { useCallback, useMemo } from 'react';
import { create } from 'zustand';

interface Store {
  activeSrc: string | null;
}

const useStore = create<Store>(() => ({
  activeSrc: null,
}));

const useSharedUnmutedVideoState = (src: string) => {
  const isMuted = useStore(state => state.activeSrc !== src);

  const activeSrc = useStore(state => state.activeSrc);

  const toggleIsMuted = useCallback(() => {
    useStore.setState({
      activeSrc: isMuted ? src : null,
    });
  }, [isMuted, src]);

  return useMemo(
    () => [isMuted, toggleIsMuted] as [boolean, () => void],
    [isMuted, toggleIsMuted],
  );
};

export default useSharedUnmutedVideoState;