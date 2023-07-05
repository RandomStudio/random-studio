export const trackPausePlay = isPlaying => {
  window.plausible?.(isPlaying ? 'Pause Video' : 'Play Video', {
    props: {
      result: 'success',
    },
  });
};

export const trackIsCurrentlyMuted = isCurrentlyMuted => {
  window.plausible?.(isCurrentlyMuted ? 'Unmute Video' : 'Mute Video', {
    props: {
      result: 'success',
    },
  });
};
