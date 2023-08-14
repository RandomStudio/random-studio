import type { HandlerEvent } from '@netlify/functions';
import sharp from 'sharp';

export const getImage = async url => {
  const response = await fetch(url);

  return Buffer.from(await response.arrayBuffer());
};

export const createPlaceholder = async (thumbnailUrl: string) => {
  const image = await getImage(thumbnailUrl);

  try {
    const buffer = await sharp(image)
      .raw()
      .ensureAlpha()
      .resize(12, 12, { fit: 'inside' })
      .toFormat(sharp.format.png)
      .toBuffer();

    return buffer.toString('base64');
  } catch (error) {
    console.error(error);

    return null;
  }
};

export const formatVideoData = async details => {
  const { guid, width, height, thumbnailFileName } = details;
  const baseUrl = `https://videos.random.studio/${guid}`;

  const thumbnailUrl = `${baseUrl}/${thumbnailFileName}`;

  const data = {
    baseUrl,
    blur: await createPlaceholder(thumbnailUrl),
    fallback: thumbnailUrl,
    height,
    hls: `${baseUrl}/playlist.m3u8`,
    width,
  };

  return data;
};

const handler = async (event: HandlerEvent) => {
  const url = new URL(event.rawUrl);
  url.pathname = '/.netlify/functions/getVideosList';
  const response = await fetch(url.href);
  const items = await response.json();

  const hasSpecifiedId = event.path.split('/').length > 4;

  if (!hasSpecifiedId) {
    return {
      statusCode: 404,
      body: null,
    };
  }

  const id = event.path.split('/').at(-1);

  const details = items.find(item => item.guid === id);

  if (!details) {
    return {
      statusCode: 400,
      body: null,
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(await formatVideoData(details)),
  };
};

export { handler };
