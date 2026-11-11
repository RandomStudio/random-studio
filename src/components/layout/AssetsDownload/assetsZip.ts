import { type Zippable, zipSync } from "fflate";
import { readFile } from "node:fs/promises";

import { getProjectAssets, type ProjectAsset } from "./getProjectAssets";

const readAssetEntry = async ({ filePath, archivePath }: ProjectAsset) =>
  [archivePath, await readFile(filePath)] as const;

const readAssetEntries = async () =>
  Object.fromEntries(await Promise.all(getProjectAssets().map(readAssetEntry)));

// Level 0 stores without compressing, since images and video are already compressed
const createZip = (entries: Zippable) => zipSync(entries, { level: 0 });

export const assetsZip = readAssetEntries().then(createZip);
