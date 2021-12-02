import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { Link } from 'gatsby';
import Img from 'gatsby-image/withIEPolyfill';
import styles from './Project.module.scss';
import ProjectVideo from '../../ProjectVideo/ProjectVideo';

const Project = ({ thumbnail, title, slug, isHidden }) => (
  <React.Fragment key={slug}>
    {isHidden ? null : (
      <Link
        className={styles.thumbnail}
        key={slug}
        id={slug}
        style={{
          marginTop: `${thumbnail.marginTop}%`,
          marginLeft: `${thumbnail.marginLeft}%`,
          width: `${thumbnail.width}%`,
        }}
        to={slug || '#'}
      >
        <div className={styles.media}>
          {/* eslint-disable-next-line no-nested-ternary */}
          {thumbnail.video ? (
            <ProjectVideo
              video={{
                autoplay: true,
                isMuted: true,
                hasControls: false,
                loops: true,
                url: thumbnail.video,
              }}
            />
          ) : !!thumbnail.image && thumbnail.image.childImageSharp ? (
            <Img loading="auto" fluid={thumbnail.image.childImageSharp.fluid} />
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
