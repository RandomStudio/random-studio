import sharp from 'sharp';
import type { HandlerEvent } from '@netlify/functions';

const getImage = async url => {
  const response = await fetch(url);

  return Buffer.from(await response.arrayBuffer());
};

export const createBlurredImage = async (thumbnailUrl: string) => {
  const image = await getImage(thumbnailUrl);

  const thumbnailSharpObject = await sharp(image)
    .raw()
    .ensureAlpha()
    .resize(12, 12, { fit: 'inside' })
    .toFormat(sharp.format.png);

  const backgroundSharpObject = await sharp(image)
    .raw()
    .ensureAlpha()
    .resize(1200, 1200, { fit: 'inside' })
    .blur(40)
    .toFormat(sharp.format.jpeg);

  const { dominant } = await backgroundSharpObject.stats();

  const dominantColorString = `rgb(${Object.values(dominant).join(',')})`;

  const thumbnailString = (await thumbnailSharpObject.toBuffer()).toString(
    'base64',
  );

  const backgroundString = (await backgroundSharpObject.toBuffer()).toString(
    'base64',
  );

  return {
    thumbnail: thumbnailString,
    background: backgroundString,
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
