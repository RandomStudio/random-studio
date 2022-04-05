import { addVimeoVideoDataToObject } from './getVideoData';

const addAdditionalInfoToBlocks = async content =>
  Promise.all(
    content.map(async block => {
      if (block.__typename === 'VideoBlockRecord' || block.__typename === 'IntroBlockRecord') {
        return {
          ...block,
          video: await addVimeoVideoDataToObject(block.video),
        };
      }

      return block;
    }),
  );

export default addAdditionalInfoToBlocks;
