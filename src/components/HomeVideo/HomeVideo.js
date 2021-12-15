import React from 'react';
import styles from './HomeVideo.module.scss';

const HomeVideo = ({ collaborationCredits, videoUrl }) => {
  return (
    <div className={styles.video}>
      <video autoPlay loop muted playsInline src={videoUrl} />
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
