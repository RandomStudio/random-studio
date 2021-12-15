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
    slug: (realSlug[0] === '/' ? realSlug : `/${realSlug}`),
  };
}

export function getAllProjects() {
  const fullPath = join(contentDirectory, 'projects');
  const slugs = fs.readdirSync(fullPath, 'utf-8');

  const posts = slugs.map(slug => {
    const data = getContentFromFile(join('projects', slug));
    console.log(data.slug)
    return data;
  });

  return posts;
}
