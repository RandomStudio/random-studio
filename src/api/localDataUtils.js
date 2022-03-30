const fs = require('fs');
const { join } = require('path');

const contentDirectory = join(process.cwd(), 'src', 'content');

export function getContentFromFile(path) {
  const realSlug = path.replace(/\.md$/, '');
  const fullPath = join(contentDirectory, `${realSlug}.md`);

  return fs.readFileSync(fullPath, 'utf8');
}

export function getAllProjects() {
  const fullPath = join(contentDirectory, 'projects');
  const slugs = fs.readdirSync(fullPath, 'utf-8');

  const posts = slugs.map(slug => {
    const data = getContentFromFile(join('projects', slug));

    return {
      name: slug,
      content: {
        text: data,
      },
    };
  });

  return posts;
}
