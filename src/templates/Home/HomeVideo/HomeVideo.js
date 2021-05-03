import { Link } from 'gatsby';
import React from 'react';
import styles from './HomeVideo.module.scss';

const HomeVideo = ({ collaborationCredits, layout, videoUrl }) => {
  const scrollToProjects = event => {
    const projectsBlock = document.getElementById('projects');
    projectsBlock.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    event.preventDefault();
  };

  const logoClass = `${styles.logo} ${layout === 'top' ? styles.isTop : styles.isCenter}`;

  return (
    <div className={styles.video}>
      <video src={videoUrl} muted loop autoPlay playsInline />
      <h1 className={logoClass}>
        {'Random'}
        <br />
        {'Studio'}
      </h1>
      <Link
        to="/#projects"
        className={styles.videoOverlay}
        onClick={scrollToProjects}
      >
        {'Projects'}
      </Link>

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
