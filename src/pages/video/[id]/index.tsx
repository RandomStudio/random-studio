import { useRouter } from 'next/router';
import Link from 'next/link';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Video from '../../../components/Video/Video';
import styles from './index.module.css';
import Controls from '../../../components/Video/Controls/Controls';

const VideoFocusModePage = () => {
  const videoRef = useRef<HTMLVideoElement>();

  const router = useRouter();
  const { id, projectId } = router.query;

  const params = useSearchParams();
  const time = params.get('time');

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
    videoRef.current.currentTime = Number(time) || 0;
  }, [time]);

  const closeJsx = useMemo(() => {
    if (projectId) {
      const handleBack = event => {
        router.back();

        event.preventDefault();

        return false;
      };

      return (
        <a href={`/projects/${projectId}`} onClick={handleBack}>
          {'Back'}
        </a>
      );
    }

    if (projectId) {
      return <Link href={`/projects/${projectId}`}>{'View case study'}</Link>;
    }

    return <Link href="/">{'Close'}</Link>;
  }, [router, projectId]);

  return (
    <div className={styles.grid}>
      <div className={styles.close}>{closeJsx}</div>

      <div className={styles.video}>
        <Video
          className={styles.frame}
          hasControls={false}
          id={id as unknown as string}
          isAutoplaying
          onClick={handleClick}
          onReady={handleReady}
          ref={videoRef}
        />
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

export default VideoFocusModePage;
