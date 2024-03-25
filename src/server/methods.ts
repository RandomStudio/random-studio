/* Server side only imports */
import { createBlurredImage } from '../../netlify/functions/getVideoThumbnail';
import { VideoData } from '../types/types';
import { getVideoDetailsById } from '../utils/videoUtils';

export const getVideoDetailsByIdOnServer = async (id: string) => {
  const videoDetails = (await getVideoDetailsById(id)) as Omit<
    VideoData,
    'blur'
  >;

  if (!videoDetails) {
    // eslint-disable-next-line no-console
    console.log('No details retrieved for ID', id);

    return null;
  }

  const imageStrings = await createBlurredImage(videoDetails.fallback);

  return {
    ...videoDetails,
    blur: imageStrings,
  };
};

export default {
  getVideoDetailsByIdOnServer,
};
