import { SINGLE_PROJECT_QUERY } from '../api/QUERIES';
import getDataFromBackend from '../api/getDataFromBackend';

export const getProjectData = async (slug: string) => {
  const { project } = await getDataFromBackend({
    query: SINGLE_PROJECT_QUERY,
    variables: {
      slug,
    },
  });

  return {
    ...project,
    opengraph: project.opengraph ?? {},
  };
};

export default {
  getProjectData,
};
