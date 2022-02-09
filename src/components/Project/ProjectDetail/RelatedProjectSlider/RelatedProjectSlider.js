import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styles from './RelatedProjectSlider.module.scss';
import Image from '../../../Image/Image';

const RelatedProjectSlider = ({ relatedProjects }) => {
  const { blockTitle, marginTop, projects } = relatedProjects;

  if (!projects || projects.length <= 0) {
    return null;
  }

  const wrapperClass = `${styles.wrapper} ${
    projects.length === 1 ? styles.isSingle : ''
  }`;

  return (
    <section
      className={wrapperClass}
      style={{ marginTop: `${marginTop}%` ?? 0 }}
    >
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
  relatedProjects: PropTypes.shape({
    blockTitle: PropTypes.string,
    marginTop: PropTypes.number,
    projects: PropTypes.string,
  }),
};

RelatedProjectSlider.defaultProps = {
  relatedProjects: {},
};

export default RelatedProjectSlider;
