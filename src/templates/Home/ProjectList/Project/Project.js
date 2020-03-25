import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { Link } from 'gatsby';
import Img from 'gatsby-image/withIEPolyfill';
import styles from './Project.module.scss';
import ProjectVideo from '../../ProjectVideo/ProjectVideo';

const Project = ({ thumbnail, title, slug, index, projects, middle }) => {
  // console.log(projects);

  return (
    <React.Fragment key={slug}>
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
          {thumbnail.video ? (
            <ProjectVideo
              video={{
                autoplay: true,
                isMuted: true,
                hasControls: false,
                loops: true,
                url: thumbnail.video,
              }}
              ratio={thumbnail.ratio}
            />
          ) : !!thumbnail.image && thumbnail.image.childImageSharp ? (
            <Img loading="auto" fluid={thumbnail.image.childImageSharp.fluid} />
          ) : (
            <img alt="" src={thumbnail.image} />
          )}
        </div>

        <div
          className={styles.title}
          style={{ marginLeft: !thumbnail.marginLeft && '1.4rem' }}
        >
          <ReactMarkdown escapeHtml={false} source={title} />
        </div>
      </Link>
      {(index === 3 ||
        (projects.length < 3 && index === projects.length - 1)) && (
        <div className={styles.intermittentStatement}>
          <ReactMarkdown escapeHtml={false} source={middle} />
        </div>
      )}
    </React.Fragment>
  );
};

Project.propTypes = {};
Project.defaultProps = {};

export default Project;
