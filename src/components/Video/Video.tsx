import useSwr from 'swr';
import styles from './Video.module.scss';
import VideoContent from './VideoContent/VideoContent';
import { getVideoData } from '../../api/videos/getVideoData';

type VideoProps = {
  hasControls?: boolean;
  isAutoplaying?: boolean;
  isLooping?: boolean;
  id: string;
};

const Video = ({
  isAutoplaying = true,
  hasControls = false,
  id,
  isLooping = true,
}: VideoProps) => {
  const { data, error, isLoading } = useSwr(id, getVideoData);

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
