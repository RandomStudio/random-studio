import React from 'react';
import PropTypes from 'prop-types';
import styles from './Highlight.module.scss';
import FluidImage from '../../../components/FluidImage/FluidImage';

const Highlight = ({ highlights }) => {
  return (
    <section className={styles.wrapper}>
      {highlights.map(({ copy, image }) => (
        <div key={image.id} className={styles.listItem}>
          <div className={styles.copyWrapper}>
            <p>{copy}</p>
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

export default Highlight;
