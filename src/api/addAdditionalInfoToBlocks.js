import { getVideoData } from './videos/getVideoData.mjs';

const addAdditionalInfoToBlocks = async content =>
  Promise.all(
    content.map(async block => {
      if (block.video || block.videoNew) {
        return {
          ...block,
          video: await getVideoData(block.video),
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
                  video: await getVideoData(slide.video),
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
