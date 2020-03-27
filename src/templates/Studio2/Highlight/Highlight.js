import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import styles from './Highlight.module.scss';
import FluidImage from '../../../components/FluidImage/FluidImage';

const Highlight = ({ title, highlights }, ref) => {
  return (
    <section ref={ref} className={styles.wrapper}>
      {highlights.map(({ copy, image }, index) => (
        <div key={image.id} className={styles.listItem}>
          <div className={styles.copyWrapper}>
            {index === 0 && <p>{title}</p>}
            <ReactMarkdown escapeHtml={false} source={copy} />
          </div>
          <FluidImage className={styles.imageWrapper} image={image} />
        </div>
      ))}
    </section>
  );
};

Highlight.propTypes = {
  highlights: PropTypes.arrayOf(
    PropTypes.shape({
      copy: PropTypes.string.isRequired,
      image: PropTypes.object.isRequired,
    }),
  ).isRequired,
};

export default React.forwardRef(Highlight);
