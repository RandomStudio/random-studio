import { useCallback, useEffect, useMemo, useState } from "react";
import { create } from 'zustand';

interface Store {
  activeSrc: string | null
};

const useStore = create<Store>(set => ({
  activeSrc: null,
}));

const useSharedActivePlayerState = (src: string) => {
  const isActivePlayer = useStore(state => state.activeSrc !== src);

  const setIsActivePlayer = useCallback((isNowActivePlayer: boolean) => {
    useStore.setState({
      activeSrc: isNowActivePlayer ? src : null,
    });
  }, []);

  return useMemo(() =>
    [isActivePlayer, setIsActivePlayer] as [boolean, (isNowActivePlayer: boolean) => void],
    [isActivePlayer, setIsActivePlayer]
  );
}

export default useSharedActivePlayerState;
