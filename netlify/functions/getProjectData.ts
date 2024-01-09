import type { HandlerEvent } from '@netlify/functions';
import { getProjectData } from '../../src/utils/productUtils';
import { CORS_HEADERS } from './utils';

const handler = async (event: HandlerEvent) => {
  const slug = event.path.split('/').at(-1);

  if (!slug) {
    return {
      statusCode: 404,
      headers: CORS_HEADERS,
    };
  }

  const project = await getProjectData(slug, true);

  return {
    statusCode: 200,
    body: JSON.stringify(project),
    headers: CORS_HEADERS,
  };
};

export { handler };
