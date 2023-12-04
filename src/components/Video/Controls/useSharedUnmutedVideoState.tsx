import { useCallback, useMemo } from 'react';
import { create } from 'zustand';

interface Store {
  activeSrc: string | null;
}

export const useMutedStore = create<Store>(() => ({
  activeSrc: null,
}));

const useSharedUnmutedVideoState = (src: string) => {
  const isMuted = useMutedStore(state => state.activeSrc !== src);

  const toggleIsMuted = useCallback(() => {
    useMutedStore.setState({
      activeSrc: isMuted ? src : null,
    });
  }, [isMuted, src]);

  return useMemo(
    () => [isMuted, toggleIsMuted] as [boolean, () => void],
    [isMuted, toggleIsMuted],
  );
};

export default useSharedUnmutedVideoState;
