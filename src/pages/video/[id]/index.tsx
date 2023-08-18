import { useRouter } from 'next/router';
import Link from 'next/link';
import { useCallback, useMemo, useRef, useState } from 'react';
import Video from '../../../components/Video/Video';
import styles from './index.module.css';
import Controls from '../../../components/Video/Controls/Controls';

const VideoFocusModePage = () => {
  const videoRef = useRef<HTMLVideoElement>();
  const router = useRouter();
  const { id, projectId } = router.query;

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
      return (
        <Link href={`/projects/${projectId}`}>
          <a>{'View case study'}</a>
        </Link>
      );
    }

    return (
      <Link href="/">
        <a>{'Close'}</a>
      </Link>
    );
  }, [router, projectId]);

  return (
    <div className={styles.grid}>
      <div className={styles.close}>{closeJsx}</div>

      <div className={styles.video}>
        <Video
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
