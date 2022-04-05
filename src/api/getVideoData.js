const sharp = require('sharp');
const { readFileSync, writeFileSync } = require('fs');

const CACHE_FILE = './.videoCache.json';

const loadCache = () => {
  try {
    const cacheString = readFileSync(CACHE_FILE);

    return JSON.parse(cacheString);
  } catch (error) {
    return {};
  }
};

const cache = loadCache();

const updateCache = (id, data) => {
  cache[id] = data;

  try {
    writeFileSync(CACHE_FILE, JSON.stringify(cache));
  } catch (err) {
    console.error(err);
  }
};

const createPlaceholder = async filePath => {
  const buffer = await sharp(filePath)
    .raw()
    .ensureAlpha()
    .resize(12, 12, { fit: 'inside' })
    .toFormat(sharp.format.png)
    .toBuffer();

  return buffer.toString('base64');
};

const getVideoDetails = async id => {
  const response = await fetch(`https://api.vimeo.com/videos/${id}`, {
    headers: {
      Authorization: `bearer ${process.env.VIMEO_TOKEN}`,
    },
  });

  return response.json();
};

const getImage = async url => {
  const response = await fetch(url);

  return Buffer.from(await response.arrayBuffer());
};

export const getVimeoVideoData = async id => {
  if (cache[id]) {
    return cache[id];
  }

  const details = await getVideoDetails(id);

  const {
    files,
    pictures: { sizes },
  } = details;

  const { link: smallest } = sizes[0];
  const { link: largest } = sizes.at(-1);

  const image = await getImage(smallest);
  const placeholder = await createPlaceholder(image);

  const data = {
    sources: {
      hls: files.find(({ quality }) => quality === 'hls')?.link ?? null,
      hd1080:
        files.find(({ rendition }) => rendition === '1080p')?.link ?? null,
      hd720: files.find(({ rendition }) => rendition === '720p')?.link ?? null,
    },
    blur: placeholder,
    fallback: largest,
  };

  updateCache(id, data);

  return data;
};

export const addVimeoVideoDataToObject = async video => {
  if (!video) {
    return null;
  }

  return {
    ...video,
    ...(await getVimeoVideoData(video.providerUid)),
  };
};
