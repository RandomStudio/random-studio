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

// Bunny video IDs are UUIDs (8-4-4-4-12 hex characters), so we can pick the ID
// out of a URL wherever it sits in the path rather than relying on position
const GUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Segments that sit alongside the ID in the URL shapes the CMS has held over the
// years: /{id}/original, /{id}/playlist.m3u8, /embed/{libraryId}/{id}
const NON_ID_SEGMENTS = ['embed', 'iframe', 'original', 'play'];

const getPathSegments = (url: string) => {
  try {
    return new URL(url).pathname.split('/').filter(Boolean);
  } catch {
    // Not parseable as a URL, so treat the whole thing as a path
    return url.split('/').filter(Boolean);
  }
};

export const sanitiseVideoId = (id: string): string | null => {
  if (!id) {
    return null;
  }

  // Drop any query string or fragment, e.g. the ?autoplay=true that Bunny puts
  // on the embed URLs you get from the "share" button
  const [withoutQuery] = id.split(/[?#]/);

  if (!/^(https?:)?\/\//i.test(withoutQuery)) {
    return withoutQuery || null;
  }

  const segments = getPathSegments(withoutQuery);

  const guid = segments.find(segment => GUID_PATTERN.test(segment));

  if (guid) {
    return guid;
  }

  // For anything not UUID-shaped, take the last segment that isn't a filename,
  // a numeric library ID, or one of the known wrapper segments
  const candidates = segments.filter(
    segment =>
      !segment.includes('.') &&
      !/^\d+$/.test(segment) &&
      !NON_ID_SEGMENTS.includes(segment.toLowerCase()),
  );

  return candidates.at(-1) ?? null;
};

export const getVideoDetailsById = async (id: string) => {
  const sanitisedId = sanitiseVideoId(id);

  if (!sanitisedId) {
    console.warn(`WARN: Unable to parse a video ID out of ${id}`);

    return null;
  }

  const items = await getVideosListWithCache();

  const details = items.find(
    (video: BunnyVideoDetails) => video.guid === sanitisedId,
  );

  if (!details) {
    console.warn(`WARN: Unable to find video with id ${sanitisedId}`);

    return null;
  }

  return formatVideoData(details);
};
