import sharp from 'sharp';
import type { HandlerEvent } from '@netlify/functions';

const getImage = async url => {
  const response = await fetch(url);

  return Buffer.from(await response.arrayBuffer());
};

export const createBlurredImage = async (thumbnailUrl: string) => {
  const image = await getImage(thumbnailUrl);

  const buffer = await sharp(image)
    .raw()
    .ensureAlpha()
    .resize(12, 12, { fit: 'inside' })
    .toFormat(sharp.format.png)
    .toBuffer();

  return buffer.toString('base64');
};

export const handler = async (event: HandlerEvent) => {
  if (!event.queryStringParameters) {
    return {
      statusCode: 404,
    };
  }

  const { thumbnailUrl } = event.queryStringParameters;

  if (!thumbnailUrl) {
    return {
      statusCode: 400,
    };
  }

  const imageString = await createBlurredImage(thumbnailUrl);

  return {
    statusCode: 200,
    body: JSON.stringify({
      imageString,
    }),
  };
};
