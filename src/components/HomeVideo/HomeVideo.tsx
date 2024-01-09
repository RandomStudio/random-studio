import React from 'react';
import Video from '../Video/Video';
import styles from './HomeVideo.module.css';
import { VideoData } from '../../types/types';

type HomeVideoProps = {
  collaborationUrl: string;
  collaborator: string;
  video: VideoData;
};

const HomeVideo = ({
  collaborator,
  collaborationUrl,
  video,
}: HomeVideoProps) => (
  <div className={styles.video}>
    <Video
      className={styles.videoWrapper}
      hasControls
      isAutoplaying
      isLooping
      video={video}
    />

    {collaborator && (
      <div className={styles.featuredAuthor}>
        {/* <span className={styles.creditsLogo}>{'Random Studio'}</span>

        <span aria-label="with">{' × '}</span> */}

        <span>
          <a href={collaborationUrl} rel="noopener noreferrer" target="_blank">
            {collaborator}
          </a>
        </span>
      </div>
    )}
  </div>
);

export default HomeVideo;
