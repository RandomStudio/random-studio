import classNames from 'classnames';
import styles from './Controls.module.scss';

type ControlsTypes = {
  baseUrl: string;
  handlePlayToggle: () => void;
  handleMuteToggle: () => void;
  isPlaying: boolean;
  isMuted: boolean;
  isFocusMode?: boolean;
};

const Controls = ({
  baseUrl,
  handlePlayToggle,
  handleMuteToggle,
  isMuted,
  isPlaying,
  isFocusMode = false,
}: ControlsTypes) => {
  const wrapperClasses = classNames(styles.wrapper, {
    [styles.isFocusMode]: isFocusMode,
  });

  return (
    <div className={wrapperClasses}>
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
        <a download href={`${baseUrl}/original`}>
          {'Download'}
        </a>

        <button type="button">{'Share'}</button>
      </div>
    </div>
  );
};

export default Controls;
