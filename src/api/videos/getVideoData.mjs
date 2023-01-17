import sharp from 'sharp';
import { getVideoDetailsById } from './bunnyCdn.mjs';
import { getCachedValue, updateCache } from './cache.mjs';

const getImage = async url => {
  const response = await fetch(url);

  return Buffer.from(await response.arrayBuffer());
};

const createPlaceholder = async url => {
  try {
    const image = await getImage(url);

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

export const getVideoData = async url => {
  if (!url) {
    return null;
  }

  // We could later save just ID via CMS to skip this step
  const id = url.replace('/original', '').split('/').at(-1);
  const baseUrl = `https://videos.random.studio/${id}`;

  const cached = getCachedValue(id);

  if (cached) {
    return cached;
  }

  const details = await getVideoDetailsById(id);

  if (!details) {
    return null;
  }

  const { width, height, availableResolutions } = details;
  const thumbnailUrl = `${baseUrl}/thumbnail.jpg`;

  const data = {
    baseUrl,
    sources: availableResolutions?.split(',')?.reverse() ?? null,
    hls: `${baseUrl}/playlist.m3u8`,
    blur: await createPlaceholder(thumbnailUrl),
    fallback: thumbnailUrl,
    width,
    height,
  };

  updateCache(id, data);

  return data;
};

export default { getVideoData };
