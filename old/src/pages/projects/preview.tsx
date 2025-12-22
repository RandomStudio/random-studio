import useSWR from 'swr';
import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import ProjectPageLayout from '../../components/ProjectPageLayout/ProjectPageLayout';
import { getFunctionUrl } from '../../utils/netlifyUtils';

const PreviewProject = () => {
  const params = useSearchParams();
  const slug = useMemo(() => params.get('slug'), [params]);

  const { data, isLoading, error } = useSWR(slug, async () => {
    const response = await fetch(
      getFunctionUrl(`/.netlify/functions/getProjectData/${slug}`),
    );

    const project = await response.json();

    return project;
  });

  if (!slug) {
    return <div>{'No slug provided'}</div>;
  }

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

export default PreviewProject;
