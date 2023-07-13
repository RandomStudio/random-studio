import classNames from 'classnames';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import styles from './SustainabilitySection.module.css';
import Image from '../Image/Image';
import Markdown from '../Markdown/Markdown';

const SustainabilitySection = ({ section }) => {
  const { image, text, title, textFirst, color } = section;

  const sectionClasses = classNames(styles.section, styles[color], {
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

SustainabilitySection.propTypes = {
  section: PropTypes.shape({
    image: PropTypes.shape.isRequired,
    color: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    textFirst: PropTypes.bool.isRequired,
  }).isRequired,
};
