import sharp from 'sharp';
import type { HandlerEvent } from '@netlify/functions';

const getImage = async url => {
  const response = await fetch(url);

  return Buffer.from(await response.arrayBuffer());
};

const handler = async (event: HandlerEvent) => {
  const { thumbnailUrl } = event.queryStringParameters;
  const image = await getImage(thumbnailUrl);

  try {
    const buffer = await sharp(image)
      .raw()
      .ensureAlpha()
      .resize(12, 12, { fit: 'inside' })
      .toFormat(sharp.format.png)
      .toBuffer();

    return {
      statusCode: 200,
      body: JSON.stringify({
        buffer: buffer.toString('base64'),
      }),
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
    };
  }
};

export { handler };
