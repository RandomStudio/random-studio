import { useRouter } from 'next/router';
import Link from 'next/link';
import Video from '../../../components/Video/Video';
import Layout from '../../../components/Layout/Layout';
import Head from '../../../components/Head/Head';

const VideoFocusModePage = () => {
  const router = useRouter();
  const { id, projectId } = router.query;

  return (
    <Layout hasFooter={false}>
      <Head />

      {projectId ? (
        <Link href={`/project/${projectId}`}>View case study</Link>
      ) : (
        <Link href="/">View website</Link>
      )}

      <h1>VideoFocusModePage</h1>

      <p>
        id:
        {id}
      </p>

      <p>
        projectId:
        {projectId}
      </p>

      <Video id={id as unknown as string} />
    </Layout>
  );
};

export default VideoFocusModePage;
