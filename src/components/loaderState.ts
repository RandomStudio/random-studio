export const LOADING_CLASS = "isLoading";
export const LOADER_SHOWN_CLASS = "hasShownLoader";
export const LOADER_COMPLETE_EVENT = "loadercomplete";

export const onLoaderComplete = (callback: () => void, signal: AbortSignal) => {
  if (!document.documentElement.classList.contains(LOADING_CLASS)) {
    callback();
    return;
  }

  document.addEventListener(LOADER_COMPLETE_EVENT, callback, {
    once: true,
    signal,
  });
};
