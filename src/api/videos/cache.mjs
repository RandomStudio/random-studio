import { accessSync, constants, readFileSync, writeFileSync } from 'fs';

const CACHE_FILE = '.videoCache.json';

const getCacheFilePath = () => {
  const localFile = `./${CACHE_FILE}`;
  const tmpFile = `./tmp/${CACHE_FILE}`;

  try {
    accessSync(localFile, constants.W_OK);

    return localFile;
  } catch (err) {
    return tmpFile;
  }
};

export const loadCache = () => {
  try {
    const cacheString = readFileSync(getCacheFilePath());

    return JSON.parse(cacheString);
  } catch (error) {
    return {};
  }
};

const cache = loadCache();

export const getCachedValue = id => {
  if (cache[id]) {
    return cache[id];
  }

  return null;
};

export const updateCache = (id, data) => {
  const freshCache = loadCache();
  freshCache[id] = data;

  try {
    writeFileSync(getCacheFilePath(), JSON.stringify(freshCache));
  } catch (err) {
    console.error(err);
  }
};
