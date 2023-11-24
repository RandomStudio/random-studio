import { useRouter } from 'next/router';
import Link from 'next/link';
import { MouseEvent, useCallback, useMemo, useRef, useState } from 'react';
import { TinyColor, isReadable } from '@ctrl/tinycolor';
import useSwr from 'swr';
import classNames from 'classnames';
import { useSearchParams } from 'next/navigation';
import { GetStaticPropsContext } from 'next';
import Head from '../../../components/Head/Head';
import Video, {
  ExtendedHTMLVideoElement,
} from '../../../components/Video/Video';
import styles from './index.module.css';
import Controls from '../../../components/Video/Controls/Controls';
import { VideoData } from '../../../types/types';
import {
  getVideoDetailsById,
  sanitiseVideoId,
} from '../../../utils/videoUtils';
import { getVideosList } from '../../../../netlify/functions/getVideosList';
import { getVideoDetailsByIdOnServer } from '../../../server/methods';
import { useMutedStore } from '../../../components/Video/Controls/useSharedUnmutedVideoState';

// Fetcher function that fetches data from getVideoData netlify function
const fetcher = async (videoRef: string, video: VideoData) => {
  if (video) {
    return video;
  }

  // Some old videos are a full URL, rather than an ID
  const id = sanitiseVideoId(videoRef) as unknown as string;

  const details = await getVideoDetailsById(id);

  if (!details) {
    console.error('Unable to retrieve video details for ID', id);

    throw new Error('No details found for id');
  }

  return details;
};

const detectVideoAudioTrack = (video: ExtendedHTMLVideoElement): boolean => {
  if (
    !('mozHasAudio' in video) &&
    !('webkitAudioDecodedByteCount' in video) &&
    !('audioTracks' in video)
  ) {
    // If we can't detect, fallback to showing manual audio controls
    return true;
  }

  return (
    video.mozHasAudio ||
    Boolean(video.webkitAudioDecodedByteCount) ||
    Boolean(video.audioTracks && video.audioTracks.length)
  );
};

type VideoFocusModePageProps = {
  video: VideoData;
};

const VideoFocusModePage = ({ video }: VideoFocusModePageProps) => {
  const videoRef = useRef<ExtendedHTMLVideoElement>(null);

  const router = useRouter();

  const { id } = router.query;

  const { data, error } = useSwr<VideoData>(
    id,
    () => fetcher(id as string, video),
    {
      fallbackData: video,
    },
  );

  const params = useSearchParams();
  const time = params.get('time');
  const projectId = params.get('time');
  const isOpenedFromProject = params.get('isOpenedFromProject');
  const isMuted = params.get('isMuted') === 'true';

  const [isReady, setIsReady] = useState(false);

  const [hasAudio, setHasAudio] = useState(true);

  const handleReady = useCallback(() => {
    if (!videoRef.current) {
      return;
    }

    setIsReady(true);

    if (!isMuted) {
      useMutedStore.setState({
        activeSrc: videoRef.current.src,
      });
    }

    videoRef.current.currentTime = Number(time) || 0;

    window.setTimeout(() => {
      if (!videoRef.current) {
        return;
      }

      setHasAudio(detectVideoAudioTrack(videoRef.current));
    }, 250);
  }, [isMuted, time]);

  const handleClick = useCallback(() => {
    if (!videoRef.current) {
      return;
    }

    videoRef.current.togglePlay();
  }, []);

  const closeJsx = useMemo(() => {
    if (isOpenedFromProject) {
      const handleBack = (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        router.back();

        return false;
      };

      return (
        <Link href={`/projects/${projectId}`} onClick={handleBack}>
          {'Back'}
        </Link>
      );
    }

    if (projectId) {
      return <Link href={`/projects/${projectId}`}>{'View case study'}</Link>;
    }

    return <Link href="/">{'Close'}</Link>;
  }, [isOpenedFromProject, router, projectId]);

  const hasInvertedColors = useMemo(() => {
    if (!data || !data.blur) {
      return false;
    }

    const bgColor = new TinyColor(data.blur.dominantColor);
    const textColor = new TinyColor('white');

    return !isReadable(bgColor, textColor);
  }, [data]);

  const gridStyles = useMemo(
    () => ({
      backgroundColor: data?.blur?.dominantColor || undefined,
      backgroundImage: data?.blur?.thumbnail
        ? `url(data:image/jpeg;base64,${data.blur.thumbnail})`
        : 'none',
    }),
    [data],
  );

  const gridClassNames = classNames(styles.grid, {
    [styles.hasInvertedColors]: hasInvertedColors,
    [styles.isVerticalVideo]: data ? data?.height > data?.width : false,
  });

  return (
    <div className={gridClassNames} style={gridStyles}>
      <Head image={data?.thumbnailUrl} title="Video Player" />

      <div className={styles.close}>{closeJsx}</div>

      <div className={styles.video}>
        {error || !data ? (
          <div className={`${styles.frame} ${styles.brokenVideo}`} />
        ) : (
          <Video
            className={styles.frame}
            hasAudio
            hasControls={false}
            isAutoplaying
            isLooping
            isMuted={isMuted}
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
          hasAudio={hasAudio}
          hasExtendedControls
          isAutoplaying
          videoRef={videoRef}
        />
      )}
    </div>
  );
};

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ id: string }>) => {
  if (!params) {
    throw new Error('No params found');
  }

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
