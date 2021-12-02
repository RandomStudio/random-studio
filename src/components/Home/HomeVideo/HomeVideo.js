import React from 'react';
import Logo from '../../../components/Logo/Logo';
import styles from './HomeVideo.module.scss';

const HomeVideo = ({ collaborationCredits, layout, videoUrl }) => {
  return (
    <div className={styles.video}>
      <video src={videoUrl} muted loop autoPlay playsInline />
      <Logo layout={layout} />

      {collaborationCredits && (
        <div className={styles.featuredAuthor}>
          <span className={styles.creditsLogo}>{'Random Studio'}</span>
          <span>{' × '}</span>
          <span>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={collaborationCredits.url}
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
