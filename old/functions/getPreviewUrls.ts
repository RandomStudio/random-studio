import type { HandlerEvent } from '@netlify/functions';
import { CORS_HEADERS } from './utils';

// This function is used to generate preview URLs for the side-by-side plugin in DatoCMS
const handler = async (event: HandlerEvent) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
    };
  }

  const { item } = JSON.parse(event?.body ?? '');

  if (!item) {
    return {
      statusCode: 404,
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      previewLinks: [
        {
          label: 'Published (en)',
          url: `https://random.studio/projects/${item.attributes.slug}`,
        },
        {
          label: 'Draft (en)',
          url: `https://random.studio/projects/preview?slug=${item.attributes.slug}`,
        },
      ],
    }),
    headers: CORS_HEADERS,
  };
};

export { handler };
