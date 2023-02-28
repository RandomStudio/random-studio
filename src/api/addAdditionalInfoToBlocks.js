import { getVideoData } from './videos/getVideoData.mjs';

const addAdditionalInfoToBlocks = async content =>
  Promise.all(
    content.map(async block => {
      if (block.video) {
        return {
          ...block,
          video: await getVideoData(block.videoNew),
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
                    video: await getVideoData(slide.videoNew),
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
