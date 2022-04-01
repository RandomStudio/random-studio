import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Image } from 'react-datocms';
import styles from './RelatedProjectSlider.module.scss';
import Project from '../../../../../components/Project/Project';
import VideoWithControls from '../../../../../components/VideoWithControls/VideoWithControls';

const RelatedProjectSlider = ({ relatedProjects, relatedProjectsTitle }) => {
  const wrapperClass = `${styles.wrapper} ${relatedProjects.length === 1 ? styles.isSingle : ''
    }`;

  return (
    <section className={wrapperClass}>
      {relatedProjectsTitle && <h4>{relatedProjectsTitle}</h4>}
      <div className={styles.worksWrapper}>
        {relatedProjects.map(
          ({ featuredImage, featuredVideo, title, slug }) => (
            <Link href={slug} key={title}>
              <a className={styles.card}>
                {featuredImage && (
                  <Image
                    alt={title}
                    className={styles.imageWrapper}
                    data={featuredImage.imageData}
                    sizes="(max-width: 864px) 268px, (max-width: 1152px) 322px, 408px"
                  />
                )}
                {featuredVideo && (
                  <VideoWithControls
                    autoplay
                    hasControls={false}
                    isAlwaysMuted
                    isMuted
                    loops
                    url={featuredVideo}
                  />
                )}
                {title && <p>{title}</p>}
              </a>
            </Link>
          ),
        )}
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
