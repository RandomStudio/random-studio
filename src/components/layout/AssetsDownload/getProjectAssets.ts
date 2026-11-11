import type { ImageMetadata } from "astro";
import { publicDir, srcDir } from "astro:config/server";
import { relative } from "node:path";
import { fileURLToPath } from "node:url";

import {
  content,
  type ContentBlock,
  type MoreInfoBlock,
  type Video,
} from "../../../data/project";

type ImportedImage = ImageMetadata & { fsPath: string };

export type ProjectAsset = {
  filePath: string;
  archivePath: string;
};

const assetsDirectoryPath = fileURLToPath(new URL("assets/", srcDir));
const publicDirectoryPath = fileURLToPath(publicDir);

// Reading fsPath, unlike src or width, does not make Astro ship the original file
const getImageAsset = (image: ImageMetadata): ProjectAsset => {
  const { fsPath } = image as ImportedImage;

  return {
    filePath: fsPath,
    archivePath: relative(assetsDirectoryPath, fsPath),
  };
};

const getVideoAsset = (video: Video): ProjectAsset => {
  const filePath = fileURLToPath(new URL(`.${video.src}`, publicDir));

  return {
    filePath,
    archivePath: relative(publicDirectoryPath, filePath),
  };
};

const getMoreInfoBlockAssets = (block: MoreInfoBlock): ProjectAsset[] => {
  switch (block.type) {
    case "image":
      return [getImageAsset(block.image)];
    case "video":
      return [getVideoAsset(block.video), getImageAsset(block.poster)];
    case "text":
      return [];
  }
};

const getContentBlockAssets = (block: ContentBlock): ProjectAsset[] => {
  switch (block.type) {
    case "image":
      return [getImageAsset(block.image)];
    case "video":
      return [getVideoAsset(block.video)];
    case "gallery":
      return block.images.map(getImageAsset);
    case "slideshow":
      return block.slides.flatMap((slide) => slide.images.map(getImageAsset));
    case "text":
      return block.moreInfo?.content.flatMap(getMoreInfoBlockAssets) ?? [];
  }
};

export const getProjectAssets = () => {
  const assetsByFilePath = new Map(
    content
      .flatMap(getContentBlockAssets)
      .map((asset) => [asset.filePath, asset]),
  );

  return [...assetsByFilePath.values()];
};
