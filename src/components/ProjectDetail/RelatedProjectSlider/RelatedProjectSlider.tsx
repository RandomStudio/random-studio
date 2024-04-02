import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import styles from './RelatedProjectSlider.module.css';
import Video from '../../Video/Video';
import Image from '../../Image/Image';
import { ProjectSummary } from '../../../types/types';

type RelatedProjectSliderProps = {
  relatedProjects: ProjectSummary[];
  relatedProjectsTitle: string;
};

const RelatedProjectSlider = ({
  relatedProjects,
  relatedProjectsTitle,
}: RelatedProjectSliderProps) => {
  const wrapperClassNames = classNames(styles.wrapper, {
    [styles.isSingle]: relatedProjects.length === 1,
  });

  return (
    <section className={wrapperClassNames}>
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
