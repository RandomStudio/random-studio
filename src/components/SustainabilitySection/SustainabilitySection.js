import ReactMarkdown from 'react-markdown';
import styles from './SustainabilitySection.module.css';
import Image from '../Image/Image';
import classNames from '../../utils/classNames';

const SustainabilitySection = ({ section }) => {
  const { image, text, title, textFirst, color } = section;

  const sectionClasses = classNames({
    [styles.section]: true,
    [styles.reverse]: !textFirst,
    [styles[color]]: true,
  });

  return (
    <section className={sectionClasses}>
      <div>
        <div className={styles.content}>
          <h2 className={styles.title}>{title}</h2>

          <ReactMarkdown>{text}</ReactMarkdown>
        </div>
      </div>

      <div>
        <Image data={image.imageData} />
      </div>
    </section>
  );
};

export default SustainabilitySection;
