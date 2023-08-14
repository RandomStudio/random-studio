import useSwr from 'swr';
import styles from './Video.module.scss';
import VideoContent from './VideoContent/VideoContent';
import { VideoData } from '../../types/types';

type VideoProps = {
  hasControls?: boolean;
  isAutoplaying?: boolean;
  isLooping?: boolean;
  id: string;
  video: VideoData;
};

// Fetcher function that fetches data from getVideoData netlify function
const fetcher = async (videoRef: string, video: VideoData) => {
  if (video) {
    return video;
  }

  // Some old videos are a full URL, rather than an ID
  const id = videoRef.includes('http')
    ? videoRef.replace('/original', '').split('/').at(-1)
    : videoRef;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_NETLIFY_FUNCTIONS_BASE_URL}/.netlify/functions/getVideoData/${id}`,
  );

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};

const Video = ({
  isAutoplaying = true,
  hasControls = false,
  id,
  isLooping = true,
  video = null,
}: VideoProps) => {
  console.log(video);

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
