import { useRouter } from 'next/router';
import Link from 'next/link';
import { useCallback, useMemo, useRef, useState } from 'react';
import tinycolor from 'tinycolor2';
import useSwr from 'swr';
import classNames from 'classnames';
import Video from '../../../components/Video/Video';
import styles from './index.module.css';
import Controls from '../../../components/Video/Controls/Controls';
import { VideoData } from '../../../types/types';
import {
  getVideoDetailsById,
  sanitiseVideoId,
} from '../../../utils/videoUtils';
import { getVideosList } from '../../../../netlify/functions/getVideosList';
import { getVideoDetailsByIdOnServer } from '../../../server/methods';

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

type VideoFocusModePageProps = {
  video: VideoData;
};

const VideoFocusModePage = ({ video }: VideoFocusModePageProps) => {
  const videoRef = useRef<HTMLVideoElement>();
  const router = useRouter();

  const { id, projectId } = router.query;

  const { data, error } = useSwr(id, () => fetcher(id as string, video), {
    fallbackData: video,
  });

  const [isReady, setIsReady] = useState(false);

  const handleClick = useCallback(() => {
    if (videoRef.current?.paused) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }, [videoRef]);

  const handleReady = useCallback(() => {
    setIsReady(true);
  }, []);

  const hasInvertedColors = useMemo(() => {
    if (!data) {
      return false;
    }

    const bgColor = tinycolor(data.blur.dominantColor);
    const textColor = tinycolor('white');

    return !tinycolor.isReadable(bgColor, textColor);
  }, [data]);

  const gridClassNames = classNames(styles.grid, {
    [styles.invertedColors]: hasInvertedColors,
  });

  return (
    <div
      className={gridClassNames}
      style={{
        backgroundColor: data.blur.dominantColor,
        backgroundImage: `url(data:image/jpeg;base64,${data.blur.background})`,
      }}
    >
      <div className={styles.close}>
        {projectId ? (
          <Link href={`/project/${projectId}`}>{'View case study'}</Link>
        ) : (
          <Link href="/">{'Close'}</Link>
        )}
      </div>

      <div className={styles.video}>
        {error || !data ? (
          <div className={`${styles.frame} ${styles.brokenVideo}`} />
        ) : (
          <Video
            className={styles.frame}
            hasControls={false}
            isAutoplaying
            isLooping
            onClick={handleClick}
            onReady={handleReady}
            ref={videoRef}
            video={data}
          />
        )}
      </div>

      {isReady && (
        <Controls
          className={styles.controls}
          hasExtendedControls
          isAutoplaying
          videoRef={videoRef}
        />
      )}
    </div>
  );
};

export const getStaticProps = async ({ params }) => {
  const video = await getVideoDetailsByIdOnServer(params.id);

  return {
    props: {
      video,
    },
  };
};

export async function getStaticPaths() {
  const videos = await getVideosList();

  return {
    fallback: false,
    paths: videos.map(({ guid }) => ({
      params: {
        id: guid,
      },
    })),
  };
}

export default VideoFocusModePage;
