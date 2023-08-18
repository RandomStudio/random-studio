import React, { forwardRef } from 'react';
import useSwr from 'swr';
import { getVideoDetailsById, sanitiseVideoId } from '../../utils/videoUtils';
import styles from './Video.module.scss';
import VideoContent from './VideoContent/VideoContent';
import { VideoData } from '../../types/types';

type VideoProps = {
  hasControls?: boolean;
  isAutoplaying?: boolean;
  isLooping?: boolean;
  id?: string;
  onClick?: () => void;
  onReady?: () => void;
  video?: VideoData;
};

// Fetcher function that fetches data from getVideoData netlify function
const fetcher = async (videoRef: string, video: VideoData) => {
  if (video) {
    return video;
  }

  // Some old videos are a full URL, rather than an ID
  const id = sanitiseVideoId(videoRef);

  const details = await getVideoDetailsById(id);

  if (!details) {
    console.error('Unable to retrieve video details for ID', id);

    throw new Error('No details found for id');
  }

  return details;
};

const Video = forwardRef<HTMLVideoElement, VideoProps>(
  (
    { isAutoplaying, hasControls, id, isLooping, onClick, onReady, video },
    ref,
  ) => {
    const { data, error, isLoading } = useSwr(id, () => fetcher(id, video), {
      fallbackData: video,
    });

    if (isLoading || error || !data) {
      return <div className={`${styles.frame} ${styles.brokenVideo}`} />;
    }

    return (
      <VideoContent
        hasControls={hasControls}
        isAutoplaying={isAutoplaying}
        isLooping={isLooping}
        onClick={onClick}
        onReady={onReady}
        ref={ref}
        video={data}
      />
    );
  },
);

Video.defaultProps = {
  hasControls: false,
  id: '',
  isAutoplaying: true,
  isLooping: true,
  onClick: () => null,
  onReady: () => null,
  video: null,
};

Video.displayName = 'Video';

export default Video;
