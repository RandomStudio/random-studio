import classNames from 'classnames';
import styles from './SustainabilitySection.module.css';

import Markdown from '../Markdown/Markdown';
import type { SustainabilityBlock } from '../../types/types';
import PixelatedImage from '../PixelatedImage/PixelatedImage';

type SustainabilitySectionProps = {
  section: SustainabilityBlock;
};

const SustainabilitySection = ({ section }: SustainabilitySectionProps) => {
  const { image, text, title, textFirst, color } = section;

  const sectionClasses = classNames(styles.section, styles[`${color}`], {
    [styles.reverse]: textFirst,
  });

  return (
    <section className={sectionClasses}>
      <div>
        <PixelatedImage image={image.imageData} />
      </div>

      <div>
        <div className={styles.content}>
          {title && <h2 className={styles.title}>{title}</h2>}

          <Markdown markdown={text} />
        </div>
      </div>
    </section>
  );
};

export default SustainabilitySection;
