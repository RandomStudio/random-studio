/* Server side only imports */
import { createBlurredImage } from '../../netlify/functions/getVideoThumbnail';
import { getVideoDetailsById } from '../utils/videoUtils';

export const getVideoDetailsByIdOnServer = async (id: string) => {
  const videoDetails = await getVideoDetailsById(id);
  const imageString = await createBlurredImage(videoDetails.fallback);

  return {
    ...videoDetails,
    blur: imageString,
  };
};

export default {
  getVideoDetailsByIdOnServer,
};
