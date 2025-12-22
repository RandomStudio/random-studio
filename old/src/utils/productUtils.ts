import { SINGLE_PROJECT_QUERY } from '../api/QUERIES';
import getDataFromBackend from '../api/getDataFromBackend';

export const getProjectData = async (slug: string, isPreview = false) => {
  const { project } = await getDataFromBackend({
    isPreview,
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
