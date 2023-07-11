import { getVideoData } from './videos/getVideoData.mjs';

const VIDEO_URL_KEYS = ['video', 'featuredVideo'];

const iterateOverValue = async (key, value) => {
  if (!value) {
    return value;
  }

  if (Array.isArray(value)) {
    return await Promise.all(value.map(async (item) => await iterateOverValue(key, item)));
  }

  if (typeof value === 'object') {
    return await addAdditionalInfoToBlocks(value);
  }

  if (VIDEO_URL_KEYS.includes(key)) {
    return await getVideoData(value);
  }

  return value;
}

const addAdditionalInfoToBlocks = async (data) => {
  const updatedData = await Promise.all(
    Object.entries(data).map(async ([key, value]) => [key, await iterateOverValue(key, value)])
  );

  return Object.fromEntries(updatedData);
};

export default addAdditionalInfoToBlocks;
