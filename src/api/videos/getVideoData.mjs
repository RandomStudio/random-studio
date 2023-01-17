import sharp from 'sharp';
import { getVideoDetailsById, getVideosList } from './bunnyCdn.mjs';
import { getCachedValue, updateCache } from './cache.mjs';

const createPlaceholder = async filePath => {
  const buffer = await sharp(filePath)
    .raw()
    .ensureAlpha()
    .resize(12, 12, { fit: 'inside' })
    .toFormat(sharp.format.png)
    .toBuffer();

  return buffer.toString('base64');
};

const getImage = async url => {
  const response = await fetch(url);

  return Buffer.from(await response.arrayBuffer());
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

  const { availableResolutions, height } = details;
  const resolutions = availableResolutions.split(',').reverse();

  const thumbnailUrl = `${baseUrl}/thumbnail.jpg`;

  const image = await getImage(thumbnailUrl);
  const placeholder = await createPlaceholder(image);

  const data = {
    baseUrl,
    sources: resolutions,
    originalSource: resolutions.find(
      source => parseInt(source.replace('p', '')) === height,
    ),
    blur: placeholder,
    fallback: thumbnailUrl,
  };

  updateCache(id, data);

  return data;
};

export default { getVideoData };
