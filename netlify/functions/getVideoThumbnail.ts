import sharp from 'sharp';
import type { HandlerEvent } from '@netlify/functions';

const getImage = async (url: string) => {
  try {
    const response = await fetch(url);

    return Buffer.from(await response.arrayBuffer());
  } catch (error) {
    console.error('Failed on URL', url);
    throw error;
  }
};

export const createBlurredImage = async (thumbnailUrl: string) => {
  const image = await getImage(thumbnailUrl);

  console.error('Success for URL', thumbnailUrl);

  const blurredSharpImage = await sharp(image)
    .raw()
    .ensureAlpha()
    .resize(400, 400, { fit: 'inside' })
    .blur(20)
    .toFormat(sharp.format.jpeg);

  const { dominant } = await blurredSharpImage.stats();

  const dominantColorString = `rgb(${Object.values(dominant).join(',')})`;

  const thumbnailString = (await blurredSharpImage.toBuffer()).toString(
    'base64',
  );

  return {
    thumbnail: thumbnailString,
    dominantColor: dominantColorString,
  };
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

  const imagesStrings = await createBlurredImage(thumbnailUrl);

  return {
    statusCode: 200,
    body: imagesStrings,
  };
};
