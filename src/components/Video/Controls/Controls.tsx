import styles from './Controls.module.scss';
import { VideoData } from '../../../types/types';

type ControlsTypes = {
  handlePlayToggle: () => void;
  handleMuteToggle: () => void;
  isPlaying: boolean;
  isMuted: boolean;
  video: VideoData;
};

const Controls = ({
  handlePlayToggle,
  handleMuteToggle,
  isMuted,
  isPlaying,
  video,
}: ControlsTypes) => {
  return (
    <div className={styles.wrapper}>
      <button
        className={styles.playToggle}
        onClick={handlePlayToggle}
        type="button"
      >
        {isPlaying ? 'Pause' : 'Play'}
      </button>

      <button
        className={styles.muteToggle}
        onClick={handleMuteToggle}
        type="button"
      >
        {isMuted ? 'Sound On' : 'Sound Off'}
      </button>

      <div className={styles.pullRight}>
        <a download href={`${video.baseUrl}/original`}>
          {'Download'}
        </a>

        <button type="button">{'Share'}</button>
      </div>
    </div>
  );
};

export default Controls;