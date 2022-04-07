import PropTypes from 'prop-types';
import React from 'react';
import { videoPropType } from '../../propTypes';
import VideoWithControls from '../VideoWithControls/VideoWithControls';
import styles from './HomeVideo.module.scss';

const HomeVideo = ({ collaborator, collaborationUrl, video }) => {
  return (
    <div className={styles.video}>
      <VideoWithControls
        autoPlay
        className={styles.videoWrapper}
        hasControls={false}
        isMuted
        loops
        video={video}
      />

      {collaborator && (
        <div className={styles.featuredAuthor}>
          <span className={styles.creditsLogo}>{'Random Studio'}</span>

          <span aria-label="with">{' × '}</span>

          <span>
            <a
              href={collaborationUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              {collaborator}
            </a>
          </span>
        </div>
      )}
    </div>
  );
};

HomeVideo.propTypes = {
  collaborationUrl: PropTypes.string.isRequired,
  collaborator: PropTypes.string.isRequired,
  video: videoPropType.isRequired,
};

export default HomeVideo;
