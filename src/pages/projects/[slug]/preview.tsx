import { GetStaticPropsContext } from 'next';
import useSWR from 'swr';
import ProjectPageLayout from '../../../components/ProjectPageLayout/ProjectPageLayout';
import { getFunctionUrl } from '../../../utils/netlifyUtils';
import { getStaticPaths as getProjectStaticPaths } from './index';

const PreviewProject = ({ slug }: { slug: string }) => {
  const { data, isLoading, error } = useSWR(slug, async () => {
    const response = await fetch(
      getFunctionUrl(`/.netlify/functions/getProjectData/${slug}`),
    );

    const project = await response.json();

    return project;
  });

  if (isLoading) {
    return <div>{'Loading preview...'}</div>;
  }

  if (error !== undefined) {
    return (
      <div>
        {'An error occurred while loading preview.'}

        <br />

        {JSON.stringify({
          error,
          data,
          isLoading,
          slug,
        })}
      </div>
    );
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <ProjectPageLayout {...data} />;
};

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ slug: string }>) => {
  return {
    props: {
      slug: params?.slug,
    },
  };
};

export const getStaticPaths = getProjectStaticPaths;

export default PreviewProject;
