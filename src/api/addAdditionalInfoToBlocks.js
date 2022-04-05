import { addVimeoVideoDataToObject } from './getVideoData';

const addAdditionalInfoToBlocks = async content =>
  Promise.all(
    content.map(async block => {
      if (block.video) {
        return {
          ...block,
          video: await addVimeoVideoDataToObject(block.video),
        };
      }

      return block;
    }),
  );

export default addAdditionalInfoToBlocks;
