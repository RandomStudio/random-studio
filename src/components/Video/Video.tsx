import React from 'react';
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

const Video = ({
  isAutoplaying = true,
  hasControls = false,
  id = '',
  isLooping = true,
  video = null,
}: VideoProps) => {
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
      video={data}
    />
  );
};

export default Video;
