import type { HandlerEvent } from '@netlify/functions';

const handler = async (event: HandlerEvent) => {
  const params = new URLSearchParams(event.rawQuery);
  const slug = params.get('slug');

  if (!slug) {
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
          url: `https://random.studio/projects/${slug}/preview`,
        },
        {
          label: 'Draft (en)',
          url: `https://random.studio/projects/${slug}/preview`,
        },
      ],
    }),
  };
};

export { handler };
