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

      if (block.slides) {
        return {
          ...block,
          slides: await Promise.all(
            block.slides.map(async slide =>
              slide.video
                ? {
                    ...slide,
                    video: await addVimeoVideoDataToObject(slide.video),
                  }
                : slide,
            ),
          ),
        };
      }

      return block;
    }),
  );

export default addAdditionalInfoToBlocks;
