const sharp = require('sharp');

const buildTimeCache = {};

const createPlaceholder = async filePath => {
  const buffer = await sharp(filePath)
    .raw()
    .ensureAlpha()
    .resize(10, 10, { fit: 'inside' })
    .toFormat(sharp.format.jpeg)
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
  if (buildTimeCache[id]) {
    return buildTimeCache[id];
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

  buildTimeCache[id] = {
    sources: {
      hls: files.find(({ quality }) => quality === 'hls')?.link ?? null,
      hd1080: files.find(({ rendition }) => rendition === '1080p')?.link ?? null,
      hd720: files.find(({ rendition }) => rendition === '720p')?.link ?? null,
    },
    blur: placeholder,
    fallback: largest,
  };

  return buildTimeCache[id];
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
