import React from 'react';
import VideoWithControls from '../VideoWithControls/VideoWithControls';
import styles from './HomeVideo.module.scss';

const HomeVideo = ({ collaborator, collaborationUrl, videoUrl }) => {
  return (
    <div className={styles.video}>
      <VideoWithControls
        autoPlay
        className={styles.videoWrapper}
        hasControls={false}
        isMuted
        loops
        url={videoUrl}
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

export default HomeVideo;
