import { GetStaticPropsContext } from 'next';
import { PROJECT_PATHS_QUERY } from '../../../api/QUERIES';
import getDataFromBackend from '../../../api/getDataFromBackend';
import ProjectPageLayout from './ProjectPageLayout';
import { getProjectData } from '../../../utils/productUtils';

const Project = ProjectPageLayout;

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ slug: string }>) => {
  if (!params?.slug) {
    throw new Error('slug is undefined');
  }

  const project = await getProjectData(params?.slug);

  return {
    props: {
      ...project,
    },
  };
};

export async function getStaticPaths() {
  const { projects } = await getDataFromBackend({
    query: PROJECT_PATHS_QUERY,
  });

  return {
    fallback: false,
    paths: projects.map(({ slug }: { slug: string }) => ({
      params: {
        slug,
      },
    })),
  };
}

export default Project;
