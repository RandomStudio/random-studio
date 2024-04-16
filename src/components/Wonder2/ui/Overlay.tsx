import styles from './UI.module.css';

type OverlayProps = {
  hasOpenedUi: boolean;
};

const Overlay = ({ hasOpenedUi }: OverlayProps) => (
  <div className={`${styles.overlay} ${hasOpenedUi && styles.isOpen}`}>
    <div className={styles.copy}>
      <p>
        {'How can we contextualise and represent a space in the digital realm?'}
      </p>

      <p>
        {
          'Here, a pastiche of Amsterdam office is represented in an interconnected system. The 3D models are directly linked to live updating data-points from the real world office: How many people are present? What are the co2 levels? Is it time for lunch?'
        }
      </p>

      <p>
        {
          'Together they build to an opaque, emergent system that absurdly mirrors our world. Check back for seasonal updates in the future.'
        }
      </p>
    </div>
  </div>
);

export default Overlay;
