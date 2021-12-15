import PropTypes from 'prop-types';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import styles from './Project.module.scss';
import ProjectVideo from './ProjectVideo/ProjectVideo';
import Image from '../Image/Image';

const Project = ({ thumbnail, title, slug }) => (
  <Link href={slug} id={slug}>
    <a
      className={styles.thumbnail}
      style={{
        marginLeft: `${thumbnail.marginLeft}%`,
        marginTop: `${thumbnail.marginTop}%`,
        width: `${thumbnail.width}%`,
      }}
    >
      <div className={styles.media}>
        {thumbnail.video ? (
          <ProjectVideo
            autoplay
            hasControls={false}
            isMuted
            loops
            url={thumbnail.video}
          />
        ) : (
          <Image
            alt="" // Keeps the screen reader focused on project list
            sizes={`(max-width: 576px) 100vw, ${thumbnail.width}vw`}
            src={thumbnail.image}
          />
        )}
      </div>

      <div
        className={styles.title}
        style={{
          marginLeft: !thumbnail.marginLeft && '1.4rem',
        }}
      >
        <ReactMarkdown escapeHtml={false} source={title} />
      </div>
    </a>
  </Link>
);

Project.propTypes = {
  slug: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  thumbnail: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

export default Project;
