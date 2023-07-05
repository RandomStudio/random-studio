import { useCallback, useEffect, useMemo, useState } from "react";
import { trackIsCurrentlyMuted } from "../../utils/analyticsUtils";
import { create } from 'zustand';

interface Store {
  activeSrc: string | null
};

const useStore = create<Store>(set => ({
  activeSrc: null,
}));

const useSharedUnmutedVideoState = (src: string) => {
  const isMuted = useStore(state => state.activeSrc !== src);

  useEffect(() => {
    trackIsCurrentlyMuted(isMuted);
  }, [isMuted]);

  const handleToggleMuted = useCallback(() => {
    useStore.setState({
      activeSrc: isMuted ? src : null,
    });
  }, []);

  return useMemo(() => [isMuted, handleToggleMuted] as [boolean, () => void], [isMuted, handleToggleMuted]);
}

export default useSharedUnmutedVideoState;
