import { getVideosList } from '../../netlify/functions/getVideosList';
import { VideoData } from '../types/types';

const getFunctionUrl = (path: string) => {
  const host =
    process.env.NEXT_PUBLIC_NETLIFY_FUNCTIONS_BASE_URL ??
    (typeof window === 'undefined'
      ? 'http://localhost:3000'
      : window.location.origin);

  const url = new URL(path, host);

  return url.href;
};

export const getVideoThumbnail = async url => {
  const response = await fetch(
    getFunctionUrl(`/.netlify/functions/getVideoThumbnail?thumbnailUrl=${url}`),
  );

  const { imageString } = await response.json();

  return imageString;
};

export const formatVideoData = async (details): Promise<VideoData> => {
  const { guid, width, height, thumbnailFileName } = details;
  const baseUrl = `https://videos.random.studio/${guid}`;

  const thumbnailUrl = `${baseUrl}/${thumbnailFileName}`;

  const data = {
    baseUrl,
    fallback: thumbnailUrl,
    guid,
    height,
    hls: `${baseUrl}/play_720p.mp4`,
    width,
  };

  if (typeof window === 'undefined') {
    return data;
  }

  return {
    ...data,
    blur: await getVideoThumbnail(thumbnailUrl),
  };
};

let cachedItems = [];

export const getVideosListWithCache = async () => {
  if (cachedItems.length > 0) {
    return cachedItems;
  }

  if (typeof window === 'undefined') {
    const items = await getVideosList();
    cachedItems = [...cachedItems, ...items];

    return items;
  }

  const response = await fetch(
    getFunctionUrl('/.netlify/functions/getVideosList'),
  );

  const items = await response.json();

  cachedItems = [...cachedItems, ...items];

  return items;
};

export const sanitiseVideoId = id =>
  id.includes('http') ? id.replace('/original', '').split('/').at(-1) : id;

export const getVideoDetailsById = async id => {
  const items = await getVideosListWithCache();
  const sanitisedId = sanitiseVideoId(id);
  const details = items.find(video => video.guid === sanitisedId);

  if (!details) {
    console.error(`Unable to find video with id ${sanitisedId}`);

    return null;
  }

  return formatVideoData(details);
};
