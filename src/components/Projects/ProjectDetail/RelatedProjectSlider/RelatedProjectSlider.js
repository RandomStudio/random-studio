import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styles from './RelatedProjectSlider.module.scss';
import Image from '../../../Image/Image';

const RelatedProjectSlider = ({ blockTitle, projects }) => {
  if (!projects || projects.length <= 0) {
    return null;
  }

  return (
    <section className={styles.wrapper}>
      {blockTitle && <h4>{blockTitle}</h4>}

      <div className={styles.worksWrapper}>
        {projects.map(({ image, title, subtitle, slug }) => (
          <Link href={slug} key={title}>
            <a className={styles.card}>
              {image && (
                <Image
                  alt={title}
                  className={styles.imageWrapper}
                  sizes="(max-width: 864px) 268px, (max-width: 1152px) 322px, 408px"
                  src={image}
                />
              )}
              {title && <p>{title}</p>}
              {subtitle && <p>{subtitle}</p>}
            </a>
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
