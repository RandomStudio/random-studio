const { readFileSync, writeFileSync } = require('fs');
const createPlaceholder = require('./createPlaceholder');
const fetch = require('node-fetch');

require('dotenv').config();

const lookupFile = './infrastructure/vimeoLookup.json';

const savedVimeoIds = JSON.parse(readFileSync(lookupFile));

const extractIds = file => {
  const fileContents = readFileSync(file, 'utf8');

  const matches = fileContents.matchAll(
    /https:\/\/player\.vimeo\.com\/external\/(.*)\./g,
  );

  const ids = [...matches].map(match => match[1].split('.')[0]);

  return ids;
};

const getVideoDetails = async id => {
  const response = await fetch(`https://api.vimeo.com/videos/${id}`, {
    headers: {
      Authorization: `bearer ${process.env.VIMEO_TOKEN}`,
    },
  });

  return response.json();
};

const getImage = async url => {
  const response = await fetch(url);

  return Buffer.from(await response.arrayBuffer());
};

const addToFile = (id, details) => {
  savedVimeoIds[id] = details

  writeFileSync(lookupFile, JSON.stringify(savedVimeoIds));

  console.log('Saved', id);
};

const processVimeo = async file => {
  const ids = extractIds(file);

  await Promise.all(
    ids.map(async id => {
      if (savedVimeoIds[id] && savedVimeoIds[id].thumb) {
        return;
      }

      const details = await getVideoDetails(id);

      if (!details || !details.pictures) {
        return;
      }

      const {
        height,
        pictures: { sizes },
        width,
      } = details;

      const { link } = sizes[0];
      const image = await getImage(link);
      const placeholder = await createPlaceholder(image);

      const payload = {
        height,
        thumb: placeholder,
        width,
      };

      addToFile(id, payload);
    }),
  );
};

const filePath = process.argv[3];

processVimeo(filePath);
