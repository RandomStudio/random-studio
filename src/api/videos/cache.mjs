import { readFileSync, writeFileSync } from 'fs';

const CACHE_FILE = './.videoCache.json';

export const loadCache = () => {
  try {
    const cacheString = readFileSync(CACHE_FILE);

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
  cache[id] = data;

  try {
    writeFileSync(CACHE_FILE, JSON.stringify(cache));
  } catch (err) {
    console.error(err);
  }
};
