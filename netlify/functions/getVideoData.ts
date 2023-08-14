import type { HandlerEvent } from '@netlify/functions';
import { formatVideoData } from '../../src/utils/videoUtils';

const handler = async (event: HandlerEvent) => {
  const url = new URL(event.rawUrl);
  url.pathname = '/.netlify/functions/getVideosList';
  const response = await fetch(url.href);
  const items = await response.json();

  const hasSpecifiedId = event.path.split('/').length > 4;

  if (!hasSpecifiedId) {
    return {
      statusCode: 404,
    };
  }

  const id = event.path.split('/').at(-1);

  const details = items.find(item => item.guid === id);

  if (!details) {
    return {
      statusCode: 400,
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(await formatVideoData(details)),
  };
};

export { handler };
