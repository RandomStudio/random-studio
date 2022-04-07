import { eraseExistingItems, uploadItem } from './model.mjs';
import { getAllFilenames, getContentFromFile } from './filesystem.mjs';
import { transformProject } from './transformer.mjs';

const ERASE_ALL_DATA_BEFORE_CONVERSION = false;

export const PATHS = {
  images: '../img',
  pages: '../content',
  project: '../content/projects',
};

const FILTER = filename => filename.includes('digital-partner-for-french-fashion-house-maison-margiela')

const TRANSFORMER = {
  project: transformProject,
};

const MODELS = ['project'];

const getModelData = async path => {
  const files = await (await getAllFilenames(path)).filter(FILTER);

  const modelData = await Promise.all(
    files.map(file => getContentFromFile(path, file)),
  );

  return modelData;
};

const start = async () => {
  if (ERASE_ALL_DATA_BEFORE_CONVERSION) {
    // await eraseExistingAssets();
    // await eraseExistingItems(MODELS);
  }

  MODELS.forEach(async model => {
    const modelData = await getModelData(PATHS[model]);
    const transformedData = [];

    for await (const [filename, content] of modelData) {
      const data = await TRANSFORMER[model](filename, content);
      transformedData.push(data);
    }

    for await (const content of transformedData) {
      await uploadItem(content);
    }
  });
};

start();
