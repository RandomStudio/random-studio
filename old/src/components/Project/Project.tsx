import React from 'react';
import Link from 'next/link';
import Markdown from '../Markdown/Markdown';
import styles from './Project.module.css';
import Video from '../Video/Video';
import Image from '../Image/Image';
import {
  Image as ImageType,
  ProjectSummary,
  VideoData,
} from '../../types/types';

type Project = Omit<ProjectSummary, 'intro' | 'tags'> & {
  className?: string;
  featuredImage: ImageType;
  featuredVideo: VideoData;
  left: number;
  top: number;
  width: number;
  title: string;
  slug: string;
};

const Project = ({
  className = '',
  featuredImage,
  featuredVideo,
  left,
  title,
  top,
  slug,
  width,
}: Project) => (
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
        <Video hasControls={false} video={featuredVideo} />
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
      <Markdown markdown={title} />
    </div>
  </Link>
);

export default Project;
