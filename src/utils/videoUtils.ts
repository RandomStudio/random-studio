let cachedItems = [];

export const getVideoThumbnail = async url => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_NETLIFY_FUNCTIONS_BASE_URL}/.netlify/functions/getVideoThumbnail?thumbnailUrl=${url}`,
  );

  const { buffer } = await response.json();

  return buffer;
};

export const formatVideoData = async details => {
  const { guid, width, height, thumbnailFileName } = details;
  const baseUrl = `https://videos.random.studio/${guid}`;

  const thumbnailUrl = `${baseUrl}/${thumbnailFileName}`;

  const data = {
    baseUrl,
    blur: await getVideoThumbnail(thumbnailUrl),
    fallback: thumbnailUrl,
    height,
    hls: `${baseUrl}/playlist.m3u8`,
    width,
  };

  return data;
};

export const getVideosList = async () => {
  if (cachedItems.length > 0) {
    return cachedItems;
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_NETLIFY_FUNCTIONS_BASE_URL}/.netlify/functions/getVideosList`,
  );

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const items = await response.json();
  cachedItems = [...cachedItems, ...items];

  return items;
};

export const sanitiseVideoId = id =>
  id.includes('http') ? id.replace('/original', '').split('/').at(-1) : id;

export const getVideoDetailsById = async id => {
  if (cachedItems.length === 0) {
    await getVideosList();
  }

  const details = cachedItems.find(video => video.guid === id);

  return formatVideoData(details);
};
