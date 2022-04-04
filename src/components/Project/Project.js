import PropTypes from 'prop-types';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Image } from 'react-datocms';
import Link from 'next/link';
import styles from './Project.module.scss';
import VideoWithControls from '../VideoWithControls/VideoWithControls';

const Project = ({
  className,
  featuredImage,
  featuredVideo,
  left,
  title,
  top,
  slug,
  width,
}) => (
  <Link href={`/projects/${slug}`} id={slug}>
    <a
      className={`${styles.thumbnail} ${className}`}
      style={{
        marginLeft: `${left}%`,
        marginTop: `${top}%`,
        width: `${width}%`,
      }}
    >
      <div className={styles.media}>
        {featuredVideo ? (
          <VideoWithControls
            autoplay
            hasControls={false}
            isMuted
            loops
            url={featuredVideo}
          />
        ) : (
          <Image
            alt="" // Keeps the screen reader focused on project list
            // sizes={`(max-width: 576px) 100vw, ${thumbnail.width}vw`}
            data={featuredImage.imageData}
          />
        )}
      </div>

      <div
        className={styles.title}
        style={
          !left || left < 1
            ? {}
            : {
              marginLeft: '0',
            }
        }
      >
        <ReactMarkdown>
          {title.replace('<br />', '<br>').replace('<br>', '\n\n')}
        </ReactMarkdown>
      </div>
    </a>
  </Link>
);

Project.propTypes = {
  slug: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  featuredImage: PropTypes.object,
  featuredVideo: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default Project;
