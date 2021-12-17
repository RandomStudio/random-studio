import matter from 'gray-matter';
import imageLookup from '../../infrastructure/imageLookup.json';

const fs = require('fs');
const { join } = require('path');

const contentDirectory = join(process.cwd(), 'src', 'content');

export function getContentFromFile(path) {
  const realSlug = path.replace(/\.md$/, '');
  const fullPath = join(contentDirectory, `${realSlug}.md`);
  let fileContents = fs.readFileSync(fullPath, 'utf8');

  if (process.env.NODE_ENV === 'production') {
    const matches = fileContents.matchAll(/(\/img\/.*)/g);
    const urls = [...matches].map(match => match[1]).flat();

    urls.forEach(url => {
      const filename = url.split('/')[2];

      fileContents = fileContents.replace(
        url,
        JSON.stringify(imageLookup[filename]),
      );
    });
  }

  const { data } = matter(fileContents);

  return {
    ...data,
    slug: realSlug[0] === '/' ? realSlug : `/${realSlug}`,
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
