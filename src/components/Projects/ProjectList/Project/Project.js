import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import styles from './Project.module.scss';
import ProjectVideo from '../../ProjectVideo/ProjectVideo';

const Project = ({ thumbnail, title, slug, isHidden }) => (
  <React.Fragment key={slug}>
    {isHidden ? null : (
      <Link href={slug || '#'} id={slug} key={slug}>
        <a
          className={styles.thumbnail}
          style={{
            marginLeft: `${thumbnail.marginLeft}%`,
            marginTop: `${thumbnail.marginTop}%`,
            width: `${thumbnail.width}%`,
          }}
        >
          <div className={styles.media}>
            {/* eslint-disable-next-line no-nested-ternary */}
            {thumbnail.video ? (
              <ProjectVideo
                video={{
                  autoplay: true,
                  hasControls: false,
                  isMuted: true,
                  loops: true,
                  url: thumbnail.video,
                }}
              />
            ) : (
              <img alt="" src={thumbnail.image} />
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
    )}
  </React.Fragment>
);

Project.propTypes = {
  isHidden: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  thumbnail: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};

export default Project;
