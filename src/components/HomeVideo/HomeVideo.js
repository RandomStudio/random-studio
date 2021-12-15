import React from 'react';
import VideoWithControls from '../VideoWithControls/VideoWithControls';
import styles from './HomeVideo.module.scss';

const HomeVideo = ({ collaborationCredits, videoUrl }) => {
  return (
    <div className={styles.video}>
      <VideoWithControls autoPlay hasControls={false} isMuted loops url={videoUrl}  />
      {collaborationCredits && (
        <div className={styles.featuredAuthor}>
          <span className={styles.creditsLogo}>{'Random Studio'}</span>
          <span>{' × '}</span>
          <span>
            <a
              href={collaborationCredits.url}
              rel="noopener noreferrer"
              target="_blank"
            >
              {collaborationCredits.collaborator}
            </a>
          </span>
        </div>
      )}
    </div>
  );
};

export default HomeVideo;
