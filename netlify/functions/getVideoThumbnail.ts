import sharp from 'sharp';
import type { HandlerEvent } from '@netlify/functions';

const getImage = async (url: string) => {
  const response = await fetch(url);

  return Buffer.from(await response.arrayBuffer());
};

export const createBlurredImage = async (thumbnailUrl: string) => {
  let image;

  try {
    image = await getImage(thumbnailUrl);
  } catch (error) {
    console.error('Failed on URL', thumbnailUrl);

    return {
      thumbnail: undefined,
      dominantColor: undefined,
    };
  }

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
    thumbnail: thumbnailString ?? null,
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
