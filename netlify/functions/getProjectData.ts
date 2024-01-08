import type { HandlerEvent } from '@netlify/functions';
import { getProjectData } from '../../src/utils/productUtils';

const handler = async (event: HandlerEvent) => {
  const slug = event.path.split('/').at(-1);

  if (!slug) {
    return {
      statusCode: 404,
    };
  }

  const project = await getProjectData(slug, true);

  return {
    statusCode: 200,
    body: JSON.stringify(project),
  };
};

export { handler };
