import { addVimeoVideoDataToObject } from './getVideoData';

const addAdditionalInfoToBlocks = async content =>
  Promise.all(
    content.map(async block =>
      block.__typename === 'VideoBlockRecord'
        ? {
          ...block,
          video: await addVimeoVideoDataToObject(block.video),
        }
        : block,
    ),
  );

export default addAdditionalInfoToBlocks;
