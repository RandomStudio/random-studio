import type { HandlerEvent } from '@netlify/functions';
import { formatVideoData } from '../../src/utils/videoUtils';
import { getVideosList } from './getVideosList';

const handler = async (event: HandlerEvent) => {
  const items = await getVideosList();

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
