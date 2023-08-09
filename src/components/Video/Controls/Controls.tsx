import styles from './Controls.module.scss';
import { VideoData } from '../../../types/types';

type ControlsTypes = {
  handlePlayToggle: () => void;
  handleMuteToggle: () => void;
  video: VideoData;
};

const Controls = ({
  handlePlayToggle,
  handleMuteToggle,
  video,
}: ControlsTypes) => {
  return (
    <div className={styles.wrapper}>
      <button onClick={handlePlayToggle} type="button">
        {'Play/pause'}
      </button>

      <button
        className={styles.muteToggle}
        onClick={handleMuteToggle}
        type="button"
      >
        {'Mute/unmute'}
      </button>

      <a download href={`${video.baseUrl}/original`}>
        {'Download'}
      </a>

      <button type="button">{'Share'}</button>
    </div>
  );
};

export default Controls;
