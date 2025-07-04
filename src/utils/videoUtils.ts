import { getVideosList } from '../../netlify/functions/getVideosList';
import { BunnyVideoDetails, VideoData } from '../types/types';
import { getFunctionUrl } from './netlifyUtils';

export const getVideoThumbnail = async (url: string) => {
  const response = await fetch(
    getFunctionUrl(`/.netlify/functions/getVideoThumbnail?thumbnailUrl=${url}`),
  );

  const { imageString } = await response.json();

  return imageString;
};

export const formatVideoData = async (
  details: BunnyVideoDetails,
): Promise<VideoData> => {
  const { guid, width, height, thumbnailFileName } = details;
  const baseUrl = `https://videos.random.studio/${guid}`;

  const thumbnailUrl = `${baseUrl}/${thumbnailFileName}`;

  const data = {
    baseUrl,
    fallback: thumbnailUrl,
    guid,
    height,
    hls: `${baseUrl}/playlist.m3u8`,
    width,
    downloadUrl: `${baseUrl}/play_720p.mp4`,
    thumbnailUrl,
  };

  if (typeof window === 'undefined') {
    return data;
  }

  return {
    ...data,
    blur: await getVideoThumbnail(thumbnailUrl),
  };
};

let cachedItems: BunnyVideoDetails[] = [];

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

export const sanitiseVideoId = (id: string) =>
  id.includes('http') ? id.replace('/original', '').split('/').at(-1) : id;

export const getVideoDetailsById = async (id: string) => {
  const items = await getVideosListWithCache();
  const sanitisedId = sanitiseVideoId(id);

  const details = items.find(
    (video: BunnyVideoDetails) => video.guid === sanitisedId,
  );

  if (!details) {
    console.warn(`WARN: Unable to find video with id ${sanitisedId}`);

    return null;
  }

  return formatVideoData(details);
};
