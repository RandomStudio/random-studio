import * as dotenv from 'dotenv';

dotenv.config();

let cachedItems = [];
const libraryId = 87989;

export const getVideosList = async () => {
  if (cachedItems.length > 0) {
    return cachedItems;
  }

  const f = await fetch(
    `https://video.bunnycdn.com/library/${libraryId}/videos?itemsPerPage=1000`,
    {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'content-type': 'application/*+json',
        AccessKey: process.env.BUNNY_TOKEN,
      },
    },
  );

  const { items } = await f.json();

  cachedItems = [...cachedItems, ...items];
};

export const getVideoDetailsById = async id => {
  if (cachedItems.length === 0) {
    await getVideosList();
  }

  return cachedItems.find(video => video.guid === id);
};
