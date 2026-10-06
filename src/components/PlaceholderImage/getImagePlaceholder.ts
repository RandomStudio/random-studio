import type { ImageMetadata } from "astro";
import sharp from "sharp";

const PLACEHOLDER_SIZE = 8;

type ImportedImage = ImageMetadata & { fsPath: string };

const placeholdersByFilePath = new Map<string, Promise<string>>();

const createPlaceholder = async (filePath: string) => {
  const data = await sharp(filePath)
    .rotate()
    .resize(PLACEHOLDER_SIZE, PLACEHOLDER_SIZE, { fit: "fill" })
    .webp()
    .toBuffer();

  return `data:image/webp;base64,${data.toString("base64")}`;
};

// Reading fsPath, unlike src or width, does not make Astro ship the original file
export const getImagePlaceholder = (image: ImageMetadata) => {
  const { fsPath } = image as ImportedImage;
  const placeholder =
    placeholdersByFilePath.get(fsPath) ?? createPlaceholder(fsPath);

  placeholdersByFilePath.set(fsPath, placeholder);
  return placeholder;
};
