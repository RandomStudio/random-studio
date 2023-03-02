import { event } from 'react-ga';

export const trackPausePlay = isPlaying => {
  event({
    action: isPlaying ? 'Pause' : 'Play',
    category: isPlaying ? 'Pause Button' : 'Play Button',
    label: 'Video Player Interactions',
  });
};

export const trackIsCurrentlyMuted = isCurrentlyMuted => {
  event({
    category: isCurrentlyMuted ? 'Unmute Button' : 'Mute Button',
    action: isCurrentlyMuted ? 'Unmute' : 'Mute',
    label: 'Video Player Interactions',
  });
};
