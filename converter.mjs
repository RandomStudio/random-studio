import fs from 'fs';
import { basename, join } from 'path';
import matter from 'gray-matter';
import { SiteClient } from 'datocms-client';

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const imageLookup = require("./infrastructure/imageLookup.json");

const client = new SiteClient('d4ade14e68bc9b263bfdfcc85cf2f5');

const eraseAllDataBeforeConversion = false;
let uploads = await client.uploads.all({}, { allPages: true });

if (eraseAllDataBeforeConversion) {
  console.log('Rolling back')
  console.log('Erasing', uploads.length, 'uploads')
  await client.uploads.bulkDestroy({uploads: uploads.map(({ id }) => id)});

  const items = await client.items.all({}, { allPages: true });
  console.log('Erasing', items.length, 'posts')
  await client.items.bulkDestroy({items: items.map(({ id }) => id)});
  console.log('Done')
  uploads = []
}

const contentDirectory = join(process.cwd(), 'src', 'content');

function getContentFromFile(path) {
  const realSlug = path.replace(/\.md$/, '');
  const fullPath = join(contentDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const { data } = matter(fileContents);

  return {
    ...data,
    slug: realSlug[0] === '/' ? realSlug : `/${realSlug}`,
  };
}

function getAllProjects() {
  const fullPath = join(contentDirectory, 'projects');
  const slugs = fs.readdirSync(fullPath, 'utf-8');

  const posts = slugs.map(slug => {
    const data = getContentFromFile(join('projects', slug));

    return data;
  });

  return posts;
}
const projects = getAllProjects();

const pause = () => new Promise((resolve) => setTimeout(resolve, 100));
const uploadImage = async file => {
  const filename = basename(file.toLowerCase()).replace('_', '').replace('_', '').replace('-–-', '-').replace('-–-', '-').replace('-–-', '-').replace('-–-', '-').replace('-–-', '-').replace('--', '-').replace(' ', '-').replace('_', '').replace('(', '').replace(')', '').replace('@', '-').replace('_', '').replace('_', '').replace('_', '').replace('_', '').replace('-.', '-').replace(' ', '-').replace(' ', '-').replace(' ', '-');

  const chunks = filename.split('.');
  const extension = chunks.at(-1);
  const rest = chunks.slice(0, -1);

  const base = `${rest.join('-')}.${extension}`;
  const existing = uploads.find(upload => upload.filename === base);
  if (existing) {
    console.log(filename, 'exists');
    return existing.id;
  }

  console.log('Uploading', filename, base)
  const path = await client.createUploadPath(`./public/${file}`);
  const upload = await client.uploads.create({ path });
  await pause();
  return upload;
}

const transformBlock = async data => {
  const shared = {
    type: "item",
    attributes: {
      margin_top: Math.round(data.marginTop) ?? 0,
      margin_left: Math.round(data.marginLeft) ?? 0,
      width: Math.round(data.width) ?? 100,
    },
    relationships: {
      item_type: {
        data: {
          id: null,
          type: 'item_type',
        }
      }
    },
  };

  const hasImage = data.image && data.image !== '';
  const hasVideo = data.video?.url && data.video.url !== '';

  if (hasVideo) {
    shared.attributes = {
        ...data.video,
        ...shared.attributes,
        ...(data.caption ? { caption: data.caption } : {}),
    };
    shared.relationships.item_type.data = {
      id: '1641762',
      type: 'item_type'
    }
    return shared;
  }

  if (hasImage) {
    shared.attributes = {
        image: data.image ? { upload_id: await uploadImage(data.image) } : null,
        ...shared.attributes,
        ...(data.caption ? { caption: data.caption } : {}),
    };
    shared.relationships.item_type.data = {
      id: '1643992',
      type: 'item_type'
    }
    return shared;
  }

  if (data.caption) {
    shared.attributes = {
        ...shared.attributes,
        text: data.caption,
    };
    shared.relationships.item_type.data = {
      id: '1643993',
      type: 'item_type'
    }
    return shared;
  }


  return null;
};

const transformOpengraph = async data => {
  if (!data) {
    return null;
  }

  const clip = (string, length) => string.length > length ? string.slice(0, length - 3) + '...' : string

  return {
    title: data.title ? clip(data.title, 60) : null,
    description: data.description ? clip(data.description, 160) : null,
    image: data.image ? await uploadImage(data.image) : null,
  }
}

const transformProject = async ({ content, title, intro, opengraph }) => {
  const blocks = [];
  for await (let block of content) {
    const result = await transformBlock(block);
    blocks.push(result);
  }

  return {
    itemType: '1641543',
    title,
    intro,
    opengraph: await transformOpengraph(opengraph),
    content: blocks.filter(e => e),
  };
}
console.log('Formatting', projects.length, 'projects');
const transformed = [];
let i1 = 0;
for await (let project of projects) {
  const result = await transformProject(project);
  transformed.push(result);
  i1++
  console.log(`${(i1 / projects.length) * 100}%`)
}

console.log('Uploading');
let i = 0
for await (let project of transformed) {
  await client.items.create(project);
  i++
  console.log(`${(i / transformed.length) * 100}%`)
}
