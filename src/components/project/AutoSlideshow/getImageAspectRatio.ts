import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { imageMetadata } from "astro/assets/utils";

export const getImageAspectRatio = async (publicSrc: string) => {
  const data = await readFile(join("public", publicSrc));
  const { width, height } = await imageMetadata(data, publicSrc);
  return width / height;
};
