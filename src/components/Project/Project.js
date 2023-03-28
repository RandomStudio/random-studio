import PropTypes from 'prop-types';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import styles from './Project.module.scss';
import VideoWithControls from '../VideoWithControls/VideoWithControls.tsx';
import Image from '../Image/Image.tsx';
import { imageDataPropType, videoPropType } from '../../propTypes';

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
  <Link
    className={`${styles.thumbnail} ${className}`}
    href={`/projects/${slug}`}
    id={slug}
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
          hasAudio={false}
          hasControls={false}
          loops
          video={featuredVideo}
          width={width}
        />
      ) : (
        <Image
          alt="" // Keeps the screen reader focused on project list
          data={featuredImage.imageData}
          sizes={`(max-width: 576px) 100vw, ${width}vw`}
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
  </Link>
);

Project.propTypes = {
  className: PropTypes.string,
  featuredImage: PropTypes.shape({
    imageData: imageDataPropType,
  }),
  featuredVideo: videoPropType,
  left: PropTypes.number.isRequired,
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  top: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};

Project.defaultProps = {
  className: '',
  featuredImage: null,
  featuredVideo: null,
};

export default Project;
