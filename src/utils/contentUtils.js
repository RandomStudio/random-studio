import matter from 'gray-matter';

const fs = require('fs');
const { join } = require('path');

const contentDirectory = join(process.cwd(), 'src', 'content');

export function getContentFromFile(path) {
  const realSlug = path.replace(/\.md$/, '');
  const fullPath = join(contentDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const { data } = matter(fileContents);

  return {
    ...data,
    slug: realSlug,
  };
}

export function getAllProjects() {
  const fullPath = join(contentDirectory, 'projects');
  const slugs = fs.readdirSync(fullPath, 'utf-8');

  const posts = slugs.map(slug => {
    const data = getContentFromFile(join('projects', slug));

    return data;
  });

  return posts;
}

export const getPlaceholderDataUrl = filePath => {
  if (!filePath) {
    return;
  }

  const path = require('path');
  const { readFileSync } = require('fs');
  const filename = path.basename(filePath);
  const mime = require('mime-types');

  const base64 = fs.readFileSync(`./public/placeholders/${filename}`, 'base64');

  return `data:${mime.contentType(filename)};base64,${base64}`;
};

export const imageStringToObject = src => {
  if (!src) {
    return null;
  }

  if (
    !src.includes('jpg') &&
    !src.includes('jpeg') &&
    !src.includes('png')
  ) {
    return src;
  }
  return {
    full: src,
    thumb: getPlaceholderDataUrl(src),
  };
};

export const addPlaceholdersToProjectBlock = block => ({
  ...block,
  ...(block.thumbnail
    ? {
      thumbnail: {
        ...block.thumbnail,
        image: imageStringToObject(block.thumbnail.image),
      }
    }
    : {}),
  ...(block.image
    ? {
      image: imageStringToObject(block.image),
    }
    : {}),
  ...(block.carousel
    ? {
      carousel: block.carousel.map(({ image }) => ({
        image: imageStringToObject(image),
      })),
    }
    : {}),
});
