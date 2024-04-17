import styles from './UI.module.css';

type OverlayProps = {
  hasOpenedUi: boolean;
};

const Overlay = ({ hasOpenedUi }: OverlayProps) => (
  <div className={`${styles.overlay} ${hasOpenedUi && styles.isOpen}`}>
    <div className={styles.copy}>
      <p>{'How can we represent a living space in the digital realm?'}</p>

      <p>
        {
          'Bringing together realtime data from sensors, devices and Slack messages from across our Amsterdam office, we produce an emergent system that absurdly mirrors our world. How are people travelling through the space? How is the air they are breathing? Is it lunch?'
        }
      </p>

      <p>
        {
          'A 3D pastiche of our office catwalk reflects this information, producing a window in to how the space changes over time. Check back for seasonal updates in the future.'
        }
      </p>
    </div>
  </div>
);

export default Overlay;
