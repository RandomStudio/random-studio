import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styles from './RelatedProjectSlider.module.scss';
import VideoWithControls from '../../VideoWithControls/VideoWithControls';
import Image from '../../Image/Image';

const RelatedProjectSlider = ({ relatedProjects, relatedProjectsTitle }) => {
  const wrapperClass = `${styles.wrapper} ${relatedProjects.length > 1 ? styles.isSingle : ''
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
                  <div className={styles.imageWrapper}>
                    <Image
                      alt={title}
                      data={featuredImage.imageData}
                      sizes="(max-width: 864px) 268px, (max-width: 1152px) 322px, 408px"
                    />
                  </div>
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
  relatedProjects: PropTypes.arrayOf(
    PropTypes.shape({
      blockTitle: PropTypes.string,
      marginTop: PropTypes.number,
      projects: PropTypes.string,
    }),
  ).isRequired,
  relatedProjectsTitle: PropTypes.string.isRequired,
};

export default RelatedProjectSlider;
