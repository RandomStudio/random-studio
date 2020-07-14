import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styles from './RelatedProjectSlider.module.scss';
import FluidImage from '../../FluidImage/FluidImage';

const RelatedProjectSlider = ({ blockTitle, projects }) => {
  if (!projects || projects.length <= 0) return null;

  return (
    <section className={styles.wrapper}>
      {blockTitle && <h4>{blockTitle}</h4>}

      <div className={styles.worksWrapper}>
        {projects.map(({ image, title, subtitle, slug }) => (
          <Link key={title} className={styles.card} to={slug}>
            <FluidImage
              objectFit="cover"
              image={image}
              className={styles.imageWrapper}
            />
            {title && <p>{title}</p>}
            {subtitle && <p>{subtitle}</p>}
          </Link>
        ))}
        <span className={styles.cardSpacer} />
      </div>
    </section>
  );
};

RelatedProjectSlider.propTypes = {
  blockTitle: PropTypes.string,
  projects: PropTypes.string,
};

RelatedProjectSlider.defaultProps = {
  blockTitle: '',
  projects: [],
};

export default RelatedProjectSlider;
