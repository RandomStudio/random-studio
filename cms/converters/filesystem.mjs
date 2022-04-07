import { promises as fs } from 'fs';
import matter from 'gray-matter';
import { join } from 'path';

export const getContentFromFile = async (path, filename) => {
  const fullPath = join(path, filename);
  const fileContents = await fs.readFile(fullPath, 'utf8',);

  const { data } = matter(fileContents);

  return [filename, data];
};

export const getAllFilenames = path => fs.readdir(path, 'utf-8');
