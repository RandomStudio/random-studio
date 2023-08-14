import { getVideoDetailsById } from './bunnyCdn';
import { VideoData } from '../../types/types';

export const getVideoData = async (id: string) => {
  const baseUrl = `https://videos.random.studio/${id}`;

  const details = await getVideoDetailsById(id);

  if (!details) {
    return null;
  }

  const { width, height } = details;

  const data: VideoData = {
    baseUrl,
    blur: '',
    height,
    hls: `${baseUrl}/playlist.m3u8`,
    width,
  };

  return data;
};

export default { getVideoData };
