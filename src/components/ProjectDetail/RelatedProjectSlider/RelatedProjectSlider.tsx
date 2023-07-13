import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styles from './RelatedProjectSlider.module.scss';
import Video from '../../Video/Video';
import Image from '../../Image/Image';
import { ProjectSummary } from '../../../types';

type RelatedProjectSliderProps = {
  relatedProjects: ProjectSummary[],
  relatedProjectsTitle: string,
};

const RelatedProjectSlider = ({ relatedProjects, relatedProjectsTitle }: RelatedProjectSliderProps) => {
  const wrapperClass = `${styles.wrapper} ${relatedProjects.length === 1 ? styles.isSingle : ''
    }`;


  return (
    <section className={wrapperClass}>
      {relatedProjectsTitle && <h4>{relatedProjectsTitle}</h4>}

      <div className={styles.worksWrapper}>
        {relatedProjects.map(
          ({ featuredImage, featuredVideo, title, slug }) => (
            <Link className={styles.card} href={slug} key={title}>
              <div className={styles.imageWrapper}>
                {featuredImage && (
                  <Image
                    alt={title}
                    data={featuredImage.imageData}
                    sizes="(max-width: 864px) 268px, (max-width: 1152px) 322px, 408px"
                  />
                )}

                {featuredVideo && (
                  <Video
                    hasControls={false}
                    isMuted={true}
                    isAutoplaying
                    isLooping
                    video={featuredVideo}
                  />
                )}
              </div>

              {title && <p>{title}</p>}
            </Link>
          ),
        )}

        <span className={styles.cardSpacer} />
      </div>
    </section>
  );
};

export default RelatedProjectSlider;
