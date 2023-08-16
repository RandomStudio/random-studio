import { useRouter } from 'next/router';
import Link from 'next/link';
import Video from '../../../components/Video/Video';
import Layout from '../../../components/Layout/Layout';
import styles from './index.module.scss';
import Head from '../../../components/Head/Head';

const VideoFocusModePage = () => {
  const router = useRouter();
  const { id, projectId } = router.query;

  return (
    <Layout hasFooter={false} hasNavigation={false}>
      <div className={styles.linkButton}>
        {projectId ? (
          <Link href={`/project/${projectId}`}>View case study</Link>
        ) : (
          <Link href="/">Close</Link>
        )}
      </div>

      <div className={styles.videoWrapper}>
        <Video hasControls id={id as unknown as string} isFocusMode />
      </div>
    </Layout>
  );
};

export default VideoFocusModePage;
