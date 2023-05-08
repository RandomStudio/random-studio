import sharp from 'sharp';
import { getVideoDetailsById } from './bunnyCdn.mjs';

const getImage = async url => {
  const response = await fetch(url);

  return Buffer.from(await response.arrayBuffer());
};

const createPlaceholder = async image => {
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

export const getVideoData = async videoRef => {
  if (!videoRef) {
    return null;
  }

  // We could later save just ID via CMS to skip this step
  const id = videoRef.includes('http')
    ? videoRef.replace('/original', '').split('/').at(-1)
    : videoRef;

  const baseUrl = `https://videos.random.studio/${id}`;

  //  const cached = getCachedValue(id);
  const details = await getVideoDetailsById(id);

  const thumbnailUrl = `${baseUrl}/${details.thumbnailFileName}`;
  const image = await getImage(thumbnailUrl);

  if (!details) {
    return null;
  }

  const { width, height, availableResolutions } = details;

  const data = {
    baseUrl,
    blur: await createPlaceholder(image),
    fallback: thumbnailUrl,
    height,
    hls: `${baseUrl}/playlist.m3u8`,
    sources: availableResolutions?.split(',')?.reverse() ?? null,
    width,
  };

  //  updateCache(id, data);

  return data;
};

export default { getVideoData };
