import { getVideoData } from './videos/getVideoData.mjs';

const addAdditionalInfoToBlocks = async content =>
  Promise.all(
    content.map(async block => {
      if (block.video) {
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

      if (block.blocks) {
        return {
          ...block,
          blocks: await Promise.all(
            block.blocks.map(async subBlock =>
              subBlock.video
                ? {
                    ...subBlock,
                    video: await getVideoData(subBlock.video),
                  }
                : subBlock,
            ),
          ),
        };
      }

      return block;
    }),
  );

export default addAdditionalInfoToBlocks;
