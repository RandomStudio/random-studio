import classNames from 'classnames';
import styles from './SustainabilitySection.module.css';
import Image from '../Image/Image';
import Markdown from '../Markdown/Markdown';
import type { Image as ImageType } from '../../types/types';

type SustainabilitySectionProps = {
  section: {
    image: ImageType;
    color: string[];
    title: string;
    text: string;
    textFirst: boolean;
  };
};

const SustainabilitySection = ({ section }: SustainabilitySectionProps) => {
  const { image, text, title, textFirst, color } = section;

  const sectionClasses = classNames(styles.section, styles[`${color}`], {
    [styles.reverse]: textFirst,
  });

  return (
    <section className={sectionClasses}>
      <div>
        <Image data={image.imageData} layout="responsive" />
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
