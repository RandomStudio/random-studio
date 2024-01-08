import type { HandlerEvent } from '@netlify/functions';

// This function is used to generate preview URLs for the side-by-side plugin in DatoCMS
const handler = async (event: HandlerEvent) => {
  const item = JSON.parse(event?.body ?? '');

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
          url: `https://random.studio/projects/${item.attributes.slug}/preview`,
        },
        {
          label: 'Draft (en)',
          url: `https://random.studio/projects/${item.attributes.slug}/preview`,
        },
      ],
    }),
  };
};

export { handler };
